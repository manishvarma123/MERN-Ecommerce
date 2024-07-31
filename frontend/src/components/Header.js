import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchdata = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchdata.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e) => {
    const {value} = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }

  }

  return (
    <>
      <header className='h-16 bg-white w-full shadow-md fixed z-40'>
        <div className='max-w-[1450px] mx-auto h-full flex justify-between items-center px-4'>
          <div>
            <Link to="/">
              <Logo w={90} h={60} />
            </Link>
          </div>

          <div className='hidden lg:flex items-center max-w-md w-full border rounded-full pl-[20px] focus-within:shadow-md'>
            <input type='text' placeholder='search product here...' className='w-full bg-transparent outline-none' onChange={handleSearch} value={search}/>
            <div className='min-w-[50px] h-[42px] bg-red-600 rounded-r-full flex justify-center items-center text-white text-[18px]'>
              <FaSearch />
            </div>
          </div>

          <div className='flex items-center gap-4'>

            <div className='relative flex justify-center'>

              {
                user?._id && (
                  <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                    {
                      user?.profilePic ? (
                        <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                      ) : (
                        <FaRegUserCircle />
                      )
                    }

                  </div>
                )
              }


              {
                menuDisplay && (
                  <div className='absolute bg-white top-11 bottom-0 h-fit p-2 rounded-md shadow-lg z-10'>
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={"/admin-panel/all-products"} onClick={() => setMenuDisplay(preve => !preve)} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'>Admin Panel</Link>
                        )
                      }

                    </nav>
                  </div>
                )
              }

            </div>

            {
              user?._id && (
                <Link to={"/cart"} className='text-2xl cursor-pointer relative'>
                  <span>
                    <FaShoppingCart />
                  </span>
                  <div className='bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center p-1 absolute -top-3 -right-3'>
                    <p className='text-sm'>{context.cartProductCount}</p>
                  </div>
                </Link>

              )

            }


            <div>
              {
                user?._id ? (
                  <button onClick={handleLogout} className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full'>Logout</button>
                )
                  :
                  (<Link to="/login" className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full'>Login</Link>)

              }
            </div>

          </div>
        </div>
      </header>
    </>
  )
}

export default Header
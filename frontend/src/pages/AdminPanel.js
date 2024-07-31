import React, { useEffect } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {

  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN ){
      navigate("/")
    }
  },[user])


  return (
    <div className='min-h-[calc(100vh-105px)] hidden md:flex'>
      <aside className='bg-white min-h-full w-full max-w-[280px] customShadow'>
        <div className='h-40 flex justify-center items-center flex-col'>
          <div className='text-6xl cursor-pointer relative flex justify-center'>
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
              ) : (
                <FaRegUserCircle />
              )
            }
          </div>
          <p className='capitalize text-xl font-bold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        {/* navigation */}
        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
          </nav>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
            <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
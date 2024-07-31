import React, { useContext, useState } from 'react'
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

  const [showPassword,setShowPassword] = useState(false);
  const [data,setData] = useState({
      email : "",
      password : ""
  })

  const navigate = useNavigate()

  const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)

  const handleOnChange = (e) => {
    const {name , value} = e.target;

    setData((preve)=>{
      return({
        ...preve,
        [name]:value
      })
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }

  }

  console.log("data login",data)

  return (
    <section id='login'>
      <div className='max-w-[1450px] mx-auto h-full p-4'>

        <div className='bg-white px-5 py-8 w-full max-w-md mx-auto rounded-md shadow-md'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='Login Icon'/>
          </div>

          <form className='mt-8 flex flex-col gap-3' onSubmit={handleSubmit}>
            <div>
              <label>Email : </label>
              <div className='bg-slate-100 px-3 py-2'>
                <input 
                    type='email' 
                    placeholder='Enter email' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    className='w-full h-full bg-transparent outline-none'/>
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className='bg-slate-100 px-3 py-2 flex items-center'>
                <input 
                    type={showPassword ? "text" : "password" } 
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                    placeholder='Enter password' 
                    className='w-full h-full bg-transparent outline-none'/>
                  
                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                  <span>
                    {
                      showPassword ? (<FaEyeSlash className='text-red-600'/>) : (<FaEye />)
                    }
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600 text-blue-800'>Forgot Password ?</Link>
            </div>

            <div className='w-full text-md mt-4 mx-auto text-center'>
              <button className='w-full max-w-[150px] mx-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded-full hover:scale-110 duration-500'>Login</button>
            </div>
          </form>

          <p className='mt-3 text-center'>Don't have Account ? <Link to={'/sign-up'} className='text-blue-800 hover:text-red-600 hover:underline'>Signup Here</Link></p>


        </div>

      </div>
    </section>
  )
}

export default Login
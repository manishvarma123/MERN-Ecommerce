import React, { useState } from 'react'
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  const [data,setData] = useState({
      name : "",
      email : "",
      password : "",
      confirmPassword : "",
      profilePic : "",
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const {name , value} = e.target;

    setData((preve)=>{
      return({
        ...preve,
        [name]:value
      })
    })
  }

  const handleUploadPic = async(e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file)

    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.signUp.url,{
        method : SummaryApi.signUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }
  
    }else{
      toast.error("Please check password and confirm Password")
      console.log("Please check password and confirm Password")
    }

    

  }

  console.log("data login",data)

  return (
    <section id='login'>
      <div className='max-w-[1450px] mx-auto h-full p-4'>

        <div className='bg-white px-5 py-8 w-full max-w-md mx-auto rounded-md shadow-md'>
          <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
            <div>
              <img src={data.profilePic || loginIcons} alt='Login Icon'/>
            </div>
            <form>
              <label>
                <div className='text-xs bg-slate-200 text-center pb-6 cursor-pointer font-bold absolute w-full bottom-0 bg-opacity-80'>
                Upload photo
                <input type='file' className='hidden' onChange={handleUploadPic} />
                </div>
              </label>
            </form>
          </div>

          <form className='mt-8 flex flex-col gap-3' onSubmit={handleSubmit}>

            <div>
              <label>Name : </label>
              <div className='bg-slate-100 px-3 py-2'>
                <input 
                    type='text' 
                    placeholder='Enter your name' 
                    name='name'
                    required
                    value={data.name}
                    onChange={handleOnChange}
                    className='w-full h-full bg-transparent outline-none'/>
              </div>
            </div>

            <div>
              <label>Email : </label>
              <div className='bg-slate-100 px-3 py-2'>
                <input 
                    type='email' 
                    placeholder='Enter email' 
                    name='email'
                    required
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
                    required
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
            </div>

            <div>
              <label>Confirm Password : </label>
              <div className='bg-slate-100 px-3 py-2 flex items-center'>
                <input 
                    type={showConfirmPassword ? "text" : "password" } 
                    name='confirmPassword'
                    required
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    placeholder='Enter confirm password' 
                    className='w-full h-full bg-transparent outline-none'/>
                  
                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                  <span>
                    {
                      showConfirmPassword ? (<FaEyeSlash className='text-red-600'/>) : (<FaEye />)
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className='w-full text-md mt-4 mx-auto text-center'>
              <button className='w-full max-w-[150px] mx-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded-full hover:scale-110 duration-500'>Sign Up</button>
            </div>
          </form>

          <p className='mt-3 text-center'>Already have Account ? <Link to={'/login'} className='text-blue-800 hover:text-red-600 hover:underline'>Login Here</Link></p>


        </div>

      </div>
    </section>
  )
}

export default SignUp
import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({userId,name,email,role,onClose,callFunc}) => {

    const [userRole,setUserRole] = useState(role)

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async() => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated",responseData)


    }

    return (
        <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center bg-slate-200/65'>
            <div className='bg-white shadow-lg p-4 w-full max-w-sm'>

                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose className=''/>
                </button >
                <h1 className='pb-3 text-lg font-medium'>Change User Role</h1>

                <p>Name : {name}</p>
                <p>Email : {email}</p>

                <div className='flex justify-between items-center my-3'>
                    <p>Role :  </p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}> 
                        {
                            Object.values(ROLE).map((el) => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className='bg-red-500 hover:bg-red-700 text-white block mx-auto border py-1 px-4 rounded-full' onClick={updateUserRole}>Change Role</button>

            </div>
        </div>
    )
}

export default ChangeUserRole
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
  const [updateUserDetails,setUserUpdateDetails] = useState({
    email : "",
    name : "",
    role : "",
    userId_id : ""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('lll')}</td>
                  <td>
                    <button className='bg-green-200 p-2 rounded-full hover:bg-green-500 hover:text-white' 
                    onClick={()=>{
                        setUserUpdateDetails(el)
                        setOpenUpdateRole(true)
                    }}>
                      <MdEdit  className='text-[20px]'/>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole onClose={()=>setOpenUpdateRole(false)} name={updateUserDetails.name} email={updateUserDetails.email} role = {updateUserDetails.role} userId={updateUserDetails._id} callFunc={fetchAllUsers}/>
        )
      }

    </div>
  )
}

export default AllUsers
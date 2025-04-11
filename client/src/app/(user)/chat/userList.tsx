'use client'
import { addSelectedUser } from '@/lib/redux/features/user/userSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserList = () => {
  const [users, setUsers] = useState([])
  const {selectedUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const fetchUsers = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    setUsers(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div>

      {users.length> 0 ? 
      
      users.map((item)=>{
            return (<div onClick={()=>dispatch(addSelectedUser(item))} className={`p-2 border border-black ${selectedUser?._id ===item?._id ? 'bg-green-200' : '' }`}>{item?.fullName}</div>)
          })

      : "No users"}
    </div>
  )
}

export default UserList
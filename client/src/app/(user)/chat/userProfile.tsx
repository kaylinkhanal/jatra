import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const {selectedUser} = useSelector(state=>state.user)

  return (
    <div>{JSON.stringify(selectedUser)}</div>
  )
}

export default UserProfile
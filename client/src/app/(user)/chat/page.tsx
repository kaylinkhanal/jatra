'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MessageArea from './messageArea'
import UserList from './userList'
import UserProfile from './userProfile'

const Chat = () => {
return (
  <div className='flex gap-2 '>
    <UserList/>
    <MessageArea/>
    <UserProfile/>
  </div>
)
}

export default Chat
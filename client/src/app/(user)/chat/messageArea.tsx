import Avatar from '@/components/avatar'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const MessageArea = () => {
    const me = 'Ram'
    const {selectedUser} = useSelector(state=>state.user)

    const messages = [{sender: 'John', text: 'Hello'}, {sender: 'Ram', text: 'hello Don'}]
    if(!selectedUser) return (
      <div>Click on user to see messages</div>
    )
    
    return (
    <div className='flex flex-col gap-4'>
        <p>{selectedUser?.fullName}</p>
        {messages.map((item)=>{
            return (
                <div key={item.sender} className={me === item.sender ? 'flex justify-end bg-blue-400 text-white p-6 ml-12' : 'bg-gray-100 p-6'}>
                 <div className='bg-green-300 w-12 rounded-full'>{item.sender[0]} </div>   {item.text}
                    </div>
            )
        })}
       <div className='flex gap-2'>
       <Input placeholder='Send message' width={100} height={24}/>
       <Send/>
       </div>
  
    </div>
  )
}

export default MessageArea
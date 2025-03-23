'use client'
import React from 'react'
import { Avatar as AvatarProfile, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown_menu"
import { logout } from '@/lib/redux/features/user/userSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

const Avatar = () => {
    const dispatch = useDispatch()
    const router=  useRouter()
    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <AvatarProfile>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </AvatarProfile>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-999'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> handleLogout()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Avatar
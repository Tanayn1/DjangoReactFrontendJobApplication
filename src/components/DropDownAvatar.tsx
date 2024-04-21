'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { ACCESS_TOKEN } from '@/constants'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DropDownAvatar() {
    const [username, setUsername] = useState('');
    const router = useRouter();
    const fetchUserName = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        console.log(token)
        try {
            const response = await fetch('https://djangobackendjobapplication.onrender.com/api/user/fetchuser/', {
                method: 'GET',
                headers: {
                 'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json',
               },
             })

             const data = await response.json()
             console.log(data[0].username.slice(0,2).toUpperCase())
             setUsername(data[0].username.slice(0,2).toUpperCase())
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchUserName();
    },[]);

    const handleLogOut = ()=>{
        localStorage.clear()
        router.push('/login')
    }
  return (
    <div className=' ml-3 '>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar >
                    <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogOut}>
                    <div className=' flex'>
                        <LogOut className='mr-2 h-4 w-4'/>
                        <span>Log Out</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
  )
}


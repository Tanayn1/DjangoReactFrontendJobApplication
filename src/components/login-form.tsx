'use client'
import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import Loading from './loading'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async ()=> {
        setIsLoading(true)
        const body = JSON.stringify({
            username: username,
            password: password
        })
            
        try {
            
            const response = await fetch('https://djangobackendjobapplication.onrender.com/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: body
            })

            const data = await response.json()
            console.log(data)
            const refreshToken = data.refresh
            const accessToken = data.access
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            localStorage.setItem(REFRESH_TOKEN, refreshToken)
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
            alert(error)
        }
        setIsLoading(false)
    }

  return (
    <div>
        <Card className=' w-[300px] shadow-xl'>
            <div className=' px-5 py-5'>
                <div>
                    <h1 className=' font-bold text-xl text-neutral-700 dark:text-neutral-300'>Login</h1>
                    <h1 className=' mt-3 text-neutral-500 dark:text-neutral-400'>To continue</h1>
                </div>
                        <div className=' mt-4'>
                            <h1 className=' mb-1 font-semibold'>Username</h1>
                            <Input placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                        </div>

                <div className=' mt-4'>
                    <h1 className=' mb-1 font-semibold'>Password</h1>
                    <Input placeholder='Password' type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <Button className=' mt-4 w-full' onClick={handleSubmit} >
                    {isLoading ? <Loading className=' bg-white'/> :'Login'}
                </Button>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <Button className=' w-full' variant="outline" onClick={()=>{router.push('/sign-up')}}>
                    Sign-Up Instead
                </Button>
            </div>
        </Card>
    </div>
  )
}


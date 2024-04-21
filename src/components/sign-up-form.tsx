'use client'
import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import Loading from './loading'

export default function SignUp() {
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const router = useRouter()
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async () => {
    setIsLoading(true)
    const body = JSON.stringify({
        username: username,
        email: email,
        password: password,
    })
    try {
        const response = await fetch('https://djangobackendjobapplication.onrender.com/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: body
        })

        const data = await response.json()
        console.log(data)
        router.push('/login')
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
                    <h1 className=' font-bold text-xl text-neutral-700 dark:text-neutral-300'>Sign Up</h1>
                    <h1 className=' mt-3 text-neutral-500 dark:text-neutral-400'>To continue</h1>
                </div>
                        <div className=' mt-4'>
                            <h1 className=' mb-1 font-semibold'>Username</h1>
                            <Input placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                        </div>
                        <div className=' mt-4'>
                            <h1 className=' mb-1 font-semibold'>Email</h1>
                            <Input placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                <div className=' mt-4'>
                    <h1 className=' mb-1 font-semibold'>Password</h1>
                    <Input placeholder='Password' type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <Button className=' mt-4 w-full' onClick={handleSubmit}>
                {isLoading ? <Loading className=' bg-white'/> :'Sign-Up'}
                </Button>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <Button className=' w-full' variant="outline" onClick={()=>{router.push('/login')}}>
                    Log-In Instead
                </Button>
            </div>
        </Card>
    </div>
  )
}

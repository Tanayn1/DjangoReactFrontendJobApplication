'use client'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import Loading from './loading'

interface Wrapper {
    children: ReactNode
}

export default function ProtectedRoute({children} : Wrapper ) {
const [isAuth, setIsAuth] = useState <null | boolean>(null)
const router = useRouter();

const refreshtoken = async ()=>{
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    const body = JSON.stringify({
        refresh: refreshToken
    })
  try {
    const response = await fetch('https://djangobackendjobapplication.onrender.com/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: body

    })

   if (response.ok) {
    const data = await response.json()
  
    const accessToken = data.access
  
    localStorage.setItem(ACCESS_TOKEN, accessToken)
   } else {
    router.push('/login')

    setIsAuth(false)
   }
  } catch (error) {
    console.log(error)
    router.push('/login')

    setIsAuth(false)
  }
}
const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
try {
  if (token !== undefined && token !== null) {
    console.log(token)
    const decode = jwtDecode(token)
    const timeNow = Date.now() / 1000
    if (decode.exp! < timeNow) {
        await refreshtoken()
    } else {
        setIsAuth(true)
    }} else {
      router.push('/sign-up')
    }
} catch (error) {
  alert('No active Account Matches Those Credentials')
  router.push('/sign-up')
  setIsAuth(false)


}

}

useEffect(()=>{
    auth();
},[])

if ( isAuth === null) {
    return <div className=' flex justify-center items-center h-screen'><Loading height={50} width={50}/></div>
} else if (isAuth === true) {
  return (
    <div>
        {children}
    </div>
  ) }
}

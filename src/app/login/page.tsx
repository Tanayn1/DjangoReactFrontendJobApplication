'use client'
import Login from '@/components/login-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function Page() {
  return (
    <div className=' flex justify-center items-center h-screen'>
         <Login/>
    </div>
  )
}

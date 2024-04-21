'use client'
import Navbar from '@/components/navbar'
import ProtectedRoute from '@/components/protected-route'
import SingleChoiceQuestion from '@/components/singlechoicequestion'
import React, { useState } from 'react'

export default function Page() {

  const choices = ['s','s', 's']
 

  return (
    <div>
        <ProtectedRoute >
            <div>
                <Navbar/>
                <div className=''>
                  <h1 className=' text-4xl font-bold text-center mb-7'>Select A <span className=' text-green-500'>QUIZ</span> To Get Started</h1>
                  <SingleChoiceQuestion />
                </div>
            </div>
        </ProtectedRoute>
    </div>
  )
}

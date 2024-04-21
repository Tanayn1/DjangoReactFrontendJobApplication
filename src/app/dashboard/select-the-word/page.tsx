
import Navbar from '@/components/navbar'
import ProtectedRoute from '@/components/protected-route'
import SelectTheWord from '@/components/select-the-word'
import React from 'react'

export default function Page() {
  return (
    <div>
        <ProtectedRoute >
            <div>
                <Navbar/>
                <div className=''>
                  <h1 className=' text-4xl font-bold text-center mb-7'>Select A <span className=' text-green-500'>QUIZ</span> To Get Started</h1>
                  <SelectTheWord />
                </div>
            </div>
        </ProtectedRoute>
    </div>
  )
}

import Navbar from '@/components/navbar'
import ProtectedRoute from '@/components/protected-route'
import QuizSelection from '@/components/quizSelection'
import Stats from '@/components/stats'
import React from 'react'

export default function Page() {
  return (
    <div>
        <ProtectedRoute >
            <div>
                <Navbar/>
                <div className=''>
                  <h1 className=' text-4xl font-bold text-center mb-7'>Select A <span className=' text-green-500'>QUIZ</span> To Get Started</h1>
                  <QuizSelection/>
                </div>
                  <div className=' mt-6'>
                    <Stats/>
                  </div>
            </div>
        </ProtectedRoute>
    </div>
  )
}

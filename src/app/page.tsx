import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/dark-mode-switch'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div>
      <nav className=' flex justify-between mt-4'>
        <div></div>
        <div className=' flex '>
          <ModeToggle />
          <Link href={'/login'}>
            <Button className=' mx-3 px-6'>
              Log In
            </Button>
          </Link>
        </div>
      </nav>

      <div className=' mt-40'>
        <h1 className=' font-bold text-4xl text-center'>Welcome To This <span className=' text-green-500'>Great</span> Quiz App</h1>
        <div className=' flex justify-center mt-3'>
          <Link href='/sign-up'>
              <Button className=' bg-green-500 hover:bg-green-700 dark:hover:bg-green-700'>Get Started Today!</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

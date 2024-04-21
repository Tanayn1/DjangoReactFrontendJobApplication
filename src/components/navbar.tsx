'use client'
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ui/dark-mode-switch'
import DropDownAvatar from './DropDownAvatar'

export default function Navbar() {


  return (
    <nav className=' flex justify-between'>
        <div></div>
        <div className=' flex m-2'>
            <ModeToggle/>
            <DropDownAvatar/>

        </div>
    </nav>
  )
}

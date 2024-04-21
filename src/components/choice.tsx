'use client'
import React, { useState } from 'react'
export default function Choice(props : any) {
    const [isClicked, setIsClicked] = useState(false)
  return (
    <div className={` ${isClicked ? ' bg-green-800':' bg-green-500'} h-[100px] w-[100px] rounded-md flex  items-center transition-transform transform hover:scale-110 cursor-pointer`} onClick={()=>{setIsClicked(isClicked ? false : true)}}>
                            <h1 className=' ml-2 text-white'>{props.choice}</h1>
        </div>
  )
}

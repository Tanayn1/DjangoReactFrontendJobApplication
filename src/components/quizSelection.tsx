import React from 'react'
import { Card } from './ui/card'
import Link from 'next/link'

export default function QuizSelection() {
  return (
    <div className=' flex justify-center'>
        
        <Card className=' w-1/2'>
            <div className=' p-8 flex justify-center '>
                <Link href={'/dashboard/singlechoicequiz'}>
                    <Card className=' bg-slate-100 dark:bg-zinc-900 shadow-md transition-transform transform hover:scale-110 cursor-pointer'>
                        <img src="/editable-flat-outline-design-of-quiz-icon-vector.jpg" alt="" width={200} />
                        <div className=' rounded-xl'>
                            <h1 className=' mb-3 text-xl font-semibold mx-3'>Single Choice</h1>
                            <h1 className=' mx-4 text-neutral-600 dark:text-neutral-300'>5 Questions</h1>
                        </div>
                    </Card>
                </Link>
                <Link href={'/dashboard/multiplechoicequiz'}>
                    <Card className=' bg-slate-100 dark:bg-zinc-900 shadow-md transition-transform transform hover:scale-110 cursor-pointer mx-4'>
                        <img src="/editable-flat-outline-design-of-quiz-icon-vector.jpg" alt="" width={200} />
                        <div className=' rounded-xl'>
                            <h1 className=' mb-3 text-xl font-semibold mx-3'>Multiple Choice</h1>
                            <h1 className=' mx-4 text-neutral-600 dark:text-neutral-300'>5 Questions</h1>
                        </div>
                    </Card>
                </Link>
                <Link href={'/dashboard/select-the-word'}>
                    <Card className=' bg-slate-100 dark:bg-zinc-900 shadow-md transition-transform transform hover:scale-110 cursor-pointer'>
                        <img src="/editable-flat-outline-design-of-quiz-icon-vector.jpg" alt="" width={200} />
                        <div className=' rounded-xl'>
                            <h1 className=' mb-3 text-xl font-semibold mx-3'>Select The Word</h1>
                            <h1 className=' mx-4 text-neutral-600 dark:text-neutral-300'>5 Questions</h1>
                        </div>
                    </Card>
                </Link>

            </div>
        </Card>
    </div>
  )
}

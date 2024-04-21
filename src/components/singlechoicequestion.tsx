'use client'
import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { ACCESS_TOKEN } from '@/constants';
import { Button } from './ui/button';
import { fetchUserName } from '../../functions';
import { useRouter } from 'next/navigation';

export default function SingleChoiceQuestion() {
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [score, setScore] = useState(0);
const [isQuizOver, setIsQuizOver] = useState(false);
const [correctAnswer, setCorrectAnswer] = useState('')
const [question, setQuestion] = useState('')
const [choices, setChoices] = useState<string[]>([])
const [isAnswerCorrect, setIsAnswerCorrect] = useState<null | Boolean>(null);
const router = useRouter();

const fetchQuestion = async ()=>{
    const token = localStorage.getItem(ACCESS_TOKEN)
    console.log(token)
    
    const response = await fetch('https://djangobackendjobapplication.onrender.com/api/getQuiz/singlechoice/', {
        method: 'GET',
        headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
    }}) 

    const data = await response.json()
    console.log(data)
    setQuestion(data[0].question)
    setCorrectAnswer(data[0].correct)
    setChoices([data[0].choiceA, data[0].choiceB, data[0].choiceC,data[0].choiceD ])

}

const evaluateQuestion =  (choice : string)=>{
        if (choice === correctAnswer) {
            setIsAnswerCorrect(true)
            setScore(score + 1)
        } else  {
            setIsAnswerCorrect(false)
              
        }   
        setTimeout(async () => {
            
              setCurrentQuestionIndex(currentQuestionIndex + 1);
               await fetchQuestion();
              
            
            setIsAnswerCorrect(null);
          }, 1000);


              
}

const finishQuiz = async ()=>{
    const token = localStorage.getItem(ACCESS_TOKEN)

    try {
        const username = await fetchUserName()

        const body = JSON.stringify({
            user: username,
            result: score,
            length: 5,
            type: 'Single'
        })

        const response = await fetch('https://djangobackendjobapplication.onrender.com/api/getQuiz/updatequizes/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: body,
            })
            const data = await response.json()
            console.log(data)
            router.push('/dashboard')
    } catch (error) {
     
    }

}

useEffect(()=>{
    fetchQuestion();    
}, [])

useEffect(()=>{
    console.log(isQuizOver)
    if (currentQuestionIndex >= 5) {
        setIsQuizOver(true)
    } 
}, [currentQuestionIndex])

  if (isQuizOver === false) { return (
    <div className=' flex justify-center'>
        
        <Card className=' '>
        <h1 className=' p-4'>Current Question: {currentQuestionIndex + 1}</h1>
            <div className='p-8 '>
                <h1>{question}</h1>
                <div className=' grid grid-cols-2 grid-rows-2 gap-3 '>
                    {choices.map((choice : string, index : number)=>{
                        if (choice) { 
                        return (<div key={index} className=' bg-green-500 h-[100px] rounded-md flex  items-center transition-transform transform hover:scale-110 cursor-pointer' onClick={()=>{evaluateQuestion(choice) ; console.log(isAnswerCorrect)}}>
                            <h1 className=' ml-2 text-white'>{choice}</h1>
                            </div>)}
                    })}
                </div>
                {isAnswerCorrect === true ? <h1 className=' text-2xl font-semibold'>Correct</h1> : isAnswerCorrect === false ? <h1 className=' text-2xl font-semibold'>Incorrect</h1> : '' }
            </div>
        </Card>
    </div>
  )} else return (
    <div className=' flex justify-center'>
        
    <Card className=' '>
    <h1 className=' p-4'>Score: {score}/5</h1>
        <div className='p-8 '>
            <Button onClick={()=>{finishQuiz()}}>Continue</Button>
        </div>
    </Card>
</div>
  )
}

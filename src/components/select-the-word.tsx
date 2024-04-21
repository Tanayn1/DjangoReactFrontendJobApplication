'use client'
import React, { useEffect, useState } from 'react'
import { Card } from './ui/card';
import { useRouter } from 'next/navigation';
import { arraysAreEqual2, fetchQuestion, finishQuiz } from '../../functions';
import { Button } from './ui/button';
import { Divide, Heading1 } from 'lucide-react';
import Choice from './choice';

export default function SelectTheWord() {
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [score, setScore] = useState(0);
const [isQuizOver, setIsQuizOver] = useState(false);
const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
const [question, setQuestion] = useState('')
const [choices, setChoices] = useState<string[]>([])
const [isAnswerCorrect, setIsAnswerCorrect] = useState<null | Boolean>(null);
const [selectedChoices, setSelectedChoices] = useState<string[]>([]);



const router = useRouter();

const Question = async ()=>{
    const data = await fetchQuestion('https://djangobackendjobapplication.onrender.com/api/getQuiz/selectwords/') 
    setQuestion(data[0].question)
    setCorrectAnswers([data[0].correctWord1, data[0].correctWord2, data[0].correctWord3])
    console.log(correctAnswers)
    setChoices([data[0].choice1, data[0].choice2, data[0].choice3,data[0].choice4, data[0].choice5, data[0].choice6, data[0].choice7, data[0].choice8  ])

}

useEffect(()=>{
    Question(); 
   
}, [])

const addItem = (choice : string)=>{
    const items = [...selectedChoices]
    items.push(choice)

    setSelectedChoices(items)
 }


const handleClick = ( value : string)=>{
   console.log(selectedChoices.includes(value))
    if (selectedChoices.includes(value)) {
        setSelectedChoices(selectedChoices.filter(item => item !== value))

    } else if (selectedChoices.length === 3) {
        alert('Max Is 3')
    } else {
        addItem(value)

    }
    console.log(selectedChoices)
}

const handleSubmit = ()=>{
    console.log(selectedChoices, correctAnswers )
    const result = arraysAreEqual2(selectedChoices, correctAnswers)
    if (result === false) {
        setIsAnswerCorrect(false)

    } else {
        setIsAnswerCorrect(true)
        setScore(score + 1)
    } 
    
    setTimeout(async () => {
        
        setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedChoices([])
          await Question();
          
        
      
      setIsAnswerCorrect(null);
    }, 1000);

}



useEffect(()=>{
    console.log(isQuizOver)
    if (currentQuestionIndex >= 5) {
        setIsQuizOver(true)
    } 
}, [currentQuestionIndex])


if (isQuizOver === false) {
  return (
    <div className=' flex justify-center'>
    <Card className=' w-[500px] '>
        <h1 className=' p-4'>Current Question: {currentQuestionIndex + 1}</h1>
            <div className='p-8 '>
                <h1>{question}</h1>
                <div className=' flex mb-8'>  {selectedChoices.length > 0 &&
                    selectedChoices.map((word, index) => (
                    <h1 key={index} className=' px-4'>{word}</h1>
                    ))}</div>
              
                <div className=' grid grid-cols-2 grid-rows-2 gap-3 '>
                    {choices.map((choice : string, index : number)=>{
                        
                        if (choice) { 
                        return (  <div className={` ${selectedChoices.includes(choice) ? ' bg-green-800':' bg-green-500'} h-[100px]  rounded-md flex  items-center transition-transform transform hover:scale-110 cursor-pointer`} onClick={()=>{handleClick(choice)}}>
                        <h1 className=' ml-2 text-white'>{choice}</h1>
    </div>)}
                    })}
                </div>
                <Button onClick={()=>{handleSubmit();}} className=' mt-4'>
                    Submit
                </Button>
                {isAnswerCorrect === true ? <h1 className=' text-2xl font-semibold'>Correct</h1> : isAnswerCorrect === false ? <h1 className=' text-2xl font-semibold'>Incorrect</h1> : '' }
            </div>
        </Card>
    </div>
  ) } else return (
    <div className=' flex justify-center'>
        
    <Card className=' '>
    <h1 className=' p-4'>Score: {score}/5</h1>
        <div className='p-8 '>
            <Button onClick={()=>{finishQuiz('Select', score, router)}}>Continue</Button>
        </div>
    </Card>
</div>
  )
}

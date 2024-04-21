'use client'
import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { ACCESS_TOKEN } from '@/constants';
import { Button } from './ui/button';
import { arraysAreEqual, finishQuiz } from '../../functions';
import { useRouter } from 'next/navigation';

export default function MultiChoiceQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
    const [question, setQuestion] = useState('')
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<null | Boolean>(null);
    const [choices, setChoices] = useState<string[]>([])
    const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const router = useRouter();

    
    const fetchQuestions = async ()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        
        const response = await fetch('https://djangobackendjobapplication.onrender.com/api/getQuiz/multichoice/', {
            method: 'GET',
            headers: {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json',
        }}) 
    
        const data = await response.json()
        console.log(data)
        setQuestion(data[0].question)
        setChoices([data[0].choiceA,data[0].choiceB,data[0].choiceC, data[0].choiceD])
        setCorrectAnswers([data[0].correct1, data[0].correct2, data[0].correct3])
        
    
    }

    const addItem = (choice : string)=>{
       const items = [...selectedChoices]
       items.push(choice)

       setSelectedChoices(items)
    }

    const removeItem = (choice : string) => {
        const updatedChoices = selectedChoices.filter(item => item !== choice);
        setSelectedChoices(updatedChoices);
      };

     
      
      
      

      const handleSubmit = ()=>{
        console.log(selectedChoices, correctAnswers )
        const result = arraysAreEqual(selectedChoices, correctAnswers)
        if (result === false) {
            setIsAnswerCorrect(false)

        } else {
            setIsAnswerCorrect(true)
            setScore(score + 1)
        } 
        
        setTimeout(async () => {
            
            setCurrentQuestionIndex(currentQuestionIndex + 1);
                
             await fetchQuestions();
             setSelectedChoices([]);
              
            
          
          setIsAnswerCorrect(null);
        }, 1000);


      } 
      
useEffect(()=>{
    fetchQuestions();
}, [])

useEffect(()=>{
    console.log(isQuizOver)
    if (currentQuestionIndex >= 5) {
        setIsQuizOver(true)
    } 
}, [currentQuestionIndex])
if (isQuizOver === false) {
  return (
    <div className=' flex justify-center'>
        <Card>
            <h1 className=' p-4'>Current Question: {currentQuestionIndex + 1}</h1>
            <div className='p-8 '>
                <h1>{question}</h1>
                <div className=' grid grid-cols-1 gap-3 '>
                    {choices.map((choice : string, index : number)=>{
                        if (choice) { 
                        return (<div className=' flex'><input type="checkbox" value={choice}  onChange={(e) => {if (e.target.checked) {
                            console.log('checked')
                            addItem(choice)
                        } else {console.log('unchecked') 
                        removeItem(choice)}}} checked={selectedChoices.includes(choice)}
                        /><h1>{choice}</h1></div>)}
                    })}
                </div>
                <Button onClick={()=>{handleSubmit();}} className=' mt-3'>Submit</Button>
                {isAnswerCorrect === true ? <h1 className=' text-2xl font-semibold'>Correct</h1> : isAnswerCorrect === false ? <h1 className=' text-2xl font-semibold'>Incorrect</h1> : '' }
            </div>
        </Card>
    </div>
  )} else return (
    <div className=' flex justify-center'>
        
    <Card className=' '>
    <h1 className=' p-4'>Score: {score}/5</h1>
        <div className='p-8 '>
            <Button onClick={()=>{finishQuiz('Multi', score, router)}}>Continue</Button>
        </div>
    </Card>
</div>
  )
}

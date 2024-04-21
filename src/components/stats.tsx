'use client'
import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { ACCESS_TOKEN } from '@/constants'
import { mode } from '../../functions'

export default function Stats() {
  const [quizAmount, setQuizAmount] = useState<null | number>(null)
  const [averageScore, setAverageScore] = useState<null | number>(null)
  const [topScore, setTopScore] = useState<null | number>(null)
  const [favQuiz, setFavQuiz] = useState<null | string>(null)

  
    
    const fetchStats = async ()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        try {
            const response = await fetch('https://djangobackendjobapplication.onrender.com/api/getQuiz/showquizes/', {
                method: 'GET',
                headers: {
                 'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json',
               },
             })

             const data = await response.json()
             console.log(data)
             setQuizAmount(data.length)
             const types: string[] = [];
             const scores: number[] = [];
             data.forEach((element : any) => {
                scores.push(element.result)
                types.push(element.type)
             });
             console.log(types, scores)
             let sum = 0
             scores.forEach((num : any)=>{
              sum += parseInt(num)
             })
             console.log(sum, scores.length)
             setAverageScore((sum / scores.length))
             setFavQuiz(mode(types))
             setTopScore(Math.max(...scores))
        } catch (error) {
            
        }
      
    }
    useEffect(()=>{
        fetchStats();
    }, [])
    if (quizAmount === 0) {return (<div></div>)} else {
  return (
    <div className=' flex justify-center'>
        <Card>
            <div className=' p-5'>
              <h1 className=' text-2xl font-semibold'>Stats</h1>
            </div>
            <div className=' p-5'>
                <div className=' grid-cols-2'>
                    <h1>Quizes Completed: {quizAmount}</h1>
                    <h1>Average Score: {averageScore?.toFixed(2) }</h1>
                    <h1>Top Score: {topScore}</h1>
                    <h1>Favourite Quiz: {favQuiz}</h1>
                </div>
            </div>
        </Card>
    </div>
  )}
}

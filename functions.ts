import { ACCESS_TOKEN } from "@/constants"
import { useRouter } from "next/navigation"


export  const fetchUserName = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    console.log(token)
    try {
        const response = await fetch('https://djangobackendjobapplication.onrender.com/api/user/fetchuser/', {
            method: 'GET',
            headers: {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json',
           },
         })

         const data = await response.json()

         return data[0].username

    } catch (error) {
        console.log(error)
    }
}


export  function arraysAreEqual(array1 : string[], array2 : string[]) {
    const filteredArray1 = array1.filter(value => value !== null);
    const filteredArray2 = array2.filter(value => value !== null);
    // Sort both arrays
    const sortedArray1 = filteredArray1.slice().sort();
    const sortedArray2 = filteredArray2.slice().sort();
  
    // Check if the sorted arrays are equal
    if (sortedArray1.length !== sortedArray2.length) {
      return false;
    }
  
    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false;
      }
    }
  
    return true; 
}

export  function arraysAreEqual2(array1 : string[], array2 : string[]) {
    const filteredArray1 = array1.filter(value => value !== null);
    const filteredArray2 = array2.filter(value => value !== null);
    // Sort both arrays

  
    // Check if the sorted arrays are equal
    if (filteredArray1.length !== filteredArray2.length) {
      return false;
    }
  
    for (let i = 0; i < filteredArray1.length; i++) {
      if (filteredArray1[i] !== filteredArray2[i]) {
        return false;
      }
    }
  
    return true; 
}



export const finishQuiz = async (type : string, score : number, router : any)=>{
    const token = localStorage.getItem(ACCESS_TOKEN)


    try {
        const username = await fetchUserName()

        const body = JSON.stringify({
            user: username,
            result: score,
            length: 5,
            type: type,
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
     console.log(error)
    }

}



export const fetchQuestion = async (apiRoute : string)=>{
    const token = localStorage.getItem(ACCESS_TOKEN)
    
    const response = await fetch(apiRoute, {
        method: 'GET',
        headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
    }}) 

    const data = await response.json()
    console.log(data)
    return data

}

export function mode(arr : any){
    if (arr.length === 0) return null
    return arr.sort((a : any,b :any) =>
          arr.filter((v: any)  => v===a).length
        - arr.filter((v : any) => v===b).length
    ).pop();
}
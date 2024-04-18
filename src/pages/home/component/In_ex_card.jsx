import React from 'react'
import { BsArrowBarUp } from "react-icons/bs";
import { BsArrowBarDown } from "react-icons/bs";
import { QueryCache, QueryClient, useQuery, useQueryClient } from "react-query"
import axios from 'axios';
import { useAtom } from 'jotai'
import { authAtom } from '../../../atoms/auth.atom';



export default function In_ex_card() {
  const getEmail=useAtom(authAtom)[0]
  const { isLoading, data:wallettotal , error, isError } = useQuery(['income_expense'], async () => {
    return await axios.get('https://expense-tracker-api-eight.vercel.app/wallet/total',{
      headers: {
        'email': getEmail.email,
      }
    })
  })

  if (isLoading) {
    
    return <h1>Loading please wait</h1>
  }
  if (isError) {
    return <h1>{isError.message}</h1>
  }
  const wallets_array=wallettotal?.data.map(w => {
    return(
      <div className='font font-size-7 ' >
      <ul className='In_ex_card_container'>
        <li className='In_ex_card'>

          <span className='spacearound'>
            <BsArrowBarUp />
            <span>Income</span>
          </span>
          <span className='font-size'>{w.total_income_this_month
} INR</span>
        </li>
        <li className='In_ex_card'>
          <span className='spacearound'>
            <BsArrowBarDown />
            <span>Expenses</span>
          </span>
          <span className='font-size'>{w.total_expense_this_month
} INR</span>
        </li>
      </ul>

    </div>
    )
})




 

  return (
    <>
      {wallets_array}
    </>
  )
}

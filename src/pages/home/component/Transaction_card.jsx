import React from 'react'
import { BsArrowBarUp } from "react-icons/bs";
import { BsArrowBarDown } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query"
import axios from 'axios'
import { useState } from "react"
import { useAtom } from 'jotai'
import { authAtom,categoryAtom,transactionAtom,transactionVisible,wallet_id_atom } from '../../../atoms/auth.atom';
import { RxPencil2 } from "react-icons/rx";





export default function Transaction_card() {

  const [pageNumber, setPageNumber] = useState(1)
  const transactionData=useAtom(transactionAtom)
  const setTransaction=useAtom(transactionVisible)
  const Wallet_id_atom=useAtom(wallet_id_atom)
  const setCategory=useAtom(categoryAtom)[1];

  const getEmail = useAtom(authAtom)[0]
  const QueryClient = useQueryClient()
  const { isLoading, data: transactionsdata, error, isError } = useQuery(['transaction', pageNumber], async () => {
    return await axios.post(`https://expense-tracker-api-eight.vercel.app/transation/get?_limit=4&_page=${pageNumber}`,{
        'email': getEmail.email,
      
    })
  }, {
    onSuccess: () => {
      QueryClient.invalidateQueries(['wallet'])
    }
  })

  if (isLoading) {

    return <h1>Loading please wait</h1>
  }
  if (isError) {
    return (<h1>{error.message}</h1>)
  }

  // console.log(transactionsdata.data.transactions)
  const transaction_array = transactionsdata?.data.transactions.map(t => {
    return (

      <div className='Transaction_card font '>
        <div className='main-box font-style-5'>
          <span className='font-style-3'>  {t.mode==0 ? <BsArrowBarUp /> : <BsArrowBarDown />} </span>
          <span>{t.expense}INR</span>
        </div>
        <span className='flexdircol'>
          <span className='center gap'>
            <span className='box'>{t.date.split("T")[0]}</span>
            <span className='box'>{t.category} </span>
            <span onClick={()=>{transactionData[1]({...t,update:true}),setTransaction[1](true),Wallet_id_atom[1](t.wallet_id),setCategory(t.mode==1?"income":"expense")}}> <RxPencil2/> </span>
          </span>

          <span className='font-style-4'>{t.title}</span>
        </span>
      </div>
    )
  })
  // console.log(transaction_array)

  return (
    <>
      <div className="flex-row">
        {transaction_array}
      <div className='btn'>
        <button style={pageNumber === 1 ? { background: "red" } : {}} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Prev</button>
        <button style={pageNumber === transactionsdata.data.count ? { background: "red" } : {}} onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === transactionsdata.data.count}>Next</button>
      </div>
      </div>

    </>
  )
}

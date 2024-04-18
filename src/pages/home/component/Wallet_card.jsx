import React from 'react'
import { BsCoin } from "react-icons/bs";
import { useState } from 'react';
import { useQuery } from "react-query"
import axios from 'axios';
import { useAtom } from 'jotai'
import { authAtom } from '../../../atoms/auth.atom';
import { RxPencil2 } from "react-icons/rx";
import { walletAtom, walletVisible } from '../../../atoms/auth.atom';




export default function Wallet_card() {

  const [pageNumber, setPageNumber] = useState(1)
  const getEmail = useAtom(authAtom)[0]
  const setWallet = useAtom(walletAtom)[1]
  const setWalletVisible = useAtom(walletVisible)
  const { isLoading, data: walletdata, error, isError } = useQuery(['wallet', pageNumber], async () => {
    return await axios.get(`https://expense-tracker-api-eight.vercel.app/wallet/get?_limit=2&_page=${pageNumber}`, {
      headers: {
        'email': getEmail.email,
      }
    })
  })

  if (isLoading) {

    return <h1>Loading please wait</h1>
  }
  if (isError) {
    return <h1>error hai bhai</h1>
  }


  const wallets_array = walletdata?.data.wallets.map(w => {
    return (

      <div className='font  Wallet-card font-size'>
        <div className='flex' style={{ justifyContent: "space-between", width: "100%" }}>

          <div className='type'>
            <BsCoin />
            <span>{w.name}</span>
          </div >
          <RxPencil2 onClick={() => { setWallet({...w,update:true}); setWalletVisible[1](!setWalletVisible[0])}} size={16} />
        </div>
        <span className=' amount'>{`${w.balance} INR`}</span>
        <div className='Inner-Wallet-card'>
          <ul className='flexdircol'>
            <li className='font-style-2'>
              INCOME THIS MONTH
            </li>
            <li className='font-style-3'>
              {w.income_this_month}
            </li>
          </ul>
          <div className='line'>

          </div>
          <ul className='flexdircol'>
            <li className='font-style-2'>
              EXPENSES THIS MONTH
            </li>
            <li className='font-style-3'>
              {w.expense_this_month}
            </li>
          </ul>
        </div>
      </div>
    )
  })



  return (
    <>
      {wallets_array}
      <div className='btn'>
        <button style={pageNumber === 1 ? { background: "red" } : {}} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Prev</button>
        <button style={pageNumber === walletdata.data.count ? { background: "red" } : {}} onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === walletdata.data.count}>Next</button>
      </div>

    </>
  )
}

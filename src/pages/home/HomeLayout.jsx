import React from 'react'
import In_ex_card from './component/In_ex_card'
import Wallet_card from './component/Wallet_card'
import Transaction from './component/Transaction_card'


export default function HomeLayout() {
  return (
    <>
      <div className='right overflow'>
        <div className='flexdircol'>

        <div className='block'><In_ex_card /> </div>
        <p className='font font-style-6  '>Wallets</p>
        <div className='right-bottom'>

          <Wallet_card />
        </div>
        </div>
       
      <div className='gap-5 '>
        <p className='font recent-transaction' >Recent Transaction</p>
        <Transaction/>
  
      </div>

      </div></>
  )
}

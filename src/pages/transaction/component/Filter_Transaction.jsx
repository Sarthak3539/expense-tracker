import React from 'react'
import { BsArrowBarUp } from "react-icons/bs";
import { BsArrowBarDown } from "react-icons/bs";
import { useQueryClient } from 'react-query';


export default function Filter_Transaction({filterData}) {
      const client = useQueryClient()
      if(filterData==undefined){
        filterData = client.getQueryData(["transaction",1]);
      }
      const transaction_array = filterData?.data.transactions.map(t => {
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
             
              </span>
    
              <span className='font-style-4'>{t.title}</span>
            </span>
          </div>
        )
      })
      
  return (
    <>
      <div className="flex-row overflow">
        {transaction_array}
           {/* <div className='btn'>
        <button style={pageNumber === 1 ? { background: "red" } : {}} onClick={() => {setPageNumber(pageNumber - 1);mutate()}} disabled={pageNumber === 1}>Prev</button>
        <button style={pageNumber === filterData.data.count ? { background: "red" } : {}} onClick={() => {setPageNumber(pageNumber + 1);mutate()}} disabled={pageNumber === filterData.data.count}>Next</button>
      </div> */}
      </div>

    </>
  )
}

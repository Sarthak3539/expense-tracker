import { useState } from 'react'
import SearchBar from './component/SearchBar'
import React from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '../../atoms/auth.atom.jsx'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import Filter_Transaction from './component/Filter_Transaction.jsx'
export default function Transaction() {

  const getEmail = useAtom(authAtom)[0]
  // const [pageNumber, setPageNumber] = useState(1);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const categoryState = useState('expense');
  const walletState = useState(useQueryClient().getQueryData(['wallet']).data.wallets[0]._id);
  const [Filterdata, setFiltardata] = useState({ email: getEmail.email, mode: categoryState[0] != 'expense', wallet_id: walletState[0] });



  const applyFilter = (filterData) => {
    return axios.post(`https://expense-tracker-api-eight.vercel.app/transation/filter`, filterData)
  }

  const { isLoading, data: filterData, error, isError, mutate } = useMutation(applyFilter, {
    mutationKey:["filter_transaction"], 
    onError: (e) => alert(e.message),
    onSuccess: (data) => {
      window.alert("added sucessfuly filter")
    },

  })
  const mutates = () => {
    Filterdata.mode = categoryState[0] != 'expense';
    Filterdata.wallet_id = walletState[0]
    console.log(Filterdata)
    mutate(Filterdata)
  }

  const clearfilter = (e) => {
    setState([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      }
    ])
    categoryState[1]('expense')
    walletState[1](useQueryClient().getQueryData(['wallet']).data.wallets[0]._id)
    mutate(e);
  }


  if (isLoading) {

    return <h1>Loading please wait</h1>
  }
  if (isError) {
    return (<h1>{error.message}</h1>)
  }


  return (
    <div className='transaction'>
      <div className='flex conent'>
        <Filter_Transaction filterData={filterData} mutate={mutates}/>
      </div>
      <SearchBar state={state} setState={setState} categoryState={categoryState} walletState={walletState} mutate={mutates} setFiltardata={setFiltardata} clearfilter={clearfilter} />
    </div>
  )
}

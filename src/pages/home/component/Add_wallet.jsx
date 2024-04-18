import React, { useState } from 'react'
import { LiaWalletSolid } from "react-icons/lia";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useQueryClient } from "react-query"
import axios from 'axios'
import { useMutation } from "react-query"
import { useAtom } from 'jotai'
import { authAtom, walletAtom } from '../../../atoms/auth.atom';

export default function Add_wallet(props) {
    const getEmail = useAtom(authAtom)[0]
    const [getWallet, setGetWallet] = useAtom(walletAtom)
    const [deleteWallet,setDeleteWallet]=useState(false)
    const addWallet = (walletData) => {
        
        return axios.post(`https://expense-tracker-api-eight.vercel.app/wallet/${deleteWallet?"delete":(getWallet.update)?"update":"add"}`, walletData)
    }
    const client = useQueryClient();


    const mut = useMutation(addWallet, {
        onError: (e) => alert("provide number in expense field"),
        onSuccess: (data) => {

            window.alert("added sucessfuly")
            props.setWalletVisible(false)

            client.invalidateQueries(["wallet"]);
        }
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setGetWallet((formData) => {
            return {
                ...formData,
                [name]: value

            }
        })

    }
    function handleform(e) {
        e.preventDefault()
       
        mut.mutate({
            ...getWallet,
            balance:parseInt(getWallet.balance),
            "email":getEmail.email}
        )
       setGetWallet({name:"",balance:"",update:false})
       setDeleteWallet(false)
    }


    return (
        <form className='font' onSubmit={(e) => handleform(e)}>
            {props.walletVisible && (
                <div className="pop-up item-dropdown">
                    <div>Add Wallet</div>

                    <div className='flex mg'>
                        <LiaWalletSolid size={30} />
                        <input type='text' placeholder='wallet name' className="pop-input" name='name' value={getWallet.name} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className='flex mg'>
                        <RiMoneyDollarCircleLine size={30} />
                        <input type='number'  placeholder='balance' className="pop-input" name='balance' value={getWallet.balance} onChange={(e) => handleChange(e)} />
                    </div>

                    <button type='submit' className='add_transaction'>ADD</button>
                    {getWallet.update && <button type='submit' className='add_transaction' onClick={()=>{setDeleteWallet(true)}}>Delete</button>}

                    <button className="close-button add_transaction " style={{ backgroundColor: "red" }} onClick={() => {  props.setWalletVisible(false);setGetWallet({name:"",balance:"",update:false})}}>
                        close
                    </button>
                </div>
            )}

        </form>
    );
}

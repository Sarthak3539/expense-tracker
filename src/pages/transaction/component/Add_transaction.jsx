import Dropdown from '../../home/component/Dropdown_input';
import React from 'react'
import { LiaWalletSolid } from "react-icons/lia";
import { MdImportExport } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { useQueryClient } from "react-query"
import { useMutation } from "react-query"
import axios from 'axios';
import { useAtom } from 'jotai'
import { authAtom, categoryAtom,deleteTransaction } from '../../../atoms/auth.atom';
import { useQuery } from 'react-query';
import { transactionAtom,wallet_id_atom,transactionVisible } from '../../../atoms/auth.atom';




export default function AddTransaction(props) {
    const category = ['expense', 'income'];
    const transactionData = useAtom(transactionAtom)
    const categoryState = useAtom(categoryAtom);
    const Wallet_id_atom=useAtom(wallet_id_atom)
    const popvisiable = useAtom(transactionVisible)
    const getEmail = useAtom(authAtom)[0]
    const deletetransaction=useAtom(deleteTransaction)
   
    const { data: walletdata } = useQuery(['wallet'], async () => {
        return await axios.get(`https://expense-tracker-api-eight.vercel.app/wallet/get`, {
            headers: {
                'email': getEmail.email,
            }
        })
    }, {
        onSuccess: (data) => {
            Wallet_id_atom[1](Wallet_id_atom[0] || data.data.wallets[0]._id );
            
        }
    })

   
    const addTransaction = (transactionDatas) => {
        return axios.post(`https://expense-tracker-api-eight.vercel.app/transation/${deletetransaction[0]==1?'delete':transactionData[0].update?"update":"add"}`, transactionDatas)
    }
    const client = useQueryClient();

    const mut = useMutation(addTransaction, {
        onError: (e) => alert("provide number in expense field"),
        onSuccess: () => {

            window.alert("added sucessfuly")
            popvisiable[1](false)

            client.invalidateQueries(["transaction new"]);
            client.invalidateQueries(["filter_transaction", 1]);
            client.invalidateQueries(["wallet",1]);
            client.invalidateQueries(["transaction",1]);

        }
    })
    function handleChange(e) {
        const { name, value } = e.target;
        transactionData[1]((formData) => {
            return {
                ...formData,
                [name]: value

            }
        })

    }



    function handleform() {
        mut.mutate({...transactionData[0],mode:categoryState[0] != 'expense',expense:parseInt(transactionData[0].expense),email:getEmail.email,wallet_id:Wallet_id_atom[0]})
        transactionData[1](
            {
                email: '',
                expense: 0,
                date: (new Date()).toISOString().split('T')[0],
                category: '',
                title: '',
                mode: true,
                update: false,
                wallet_id: null
            }
        )
        popvisiable[1](false)
    }

    return (<>
        {props.isPopupVisible && (
            <div className="pop-up item-dropdown">
                <div>Add Transaction</div>
                <div className='flex mg'>
                    <LiaWalletSolid size={30} />
                    <Dropdown state={Wallet_id_atom} options={walletdata.data.wallets} />
                </div>
                <div className='flex mg'>
                    <MdImportExport size={30} />
                    <Dropdown state={categoryState} options={category} />
                </div>
                <div className='flex mg'>
                    <MdOutlineSubtitles size={30} />
                    <input type='text' placeholder='title' className="pop-input" name='title' value={transactionData[0].title} onChange={handleChange} />
                </div>
                <div className='flex mg'>
                    <TbCategoryPlus size={30} />
                    <input type='text' placeholder='category' className="pop-input" name='category' value={transactionData[0].category} onChange={handleChange} />
                </div>
                <div className='flex mg'>
                    <RiMoneyDollarCircleLine size={30} />
                    <input type='number' placeholder='amount' className="pop-input" name='expense' value={transactionData[0].expense} onChange={handleChange} />
                </div>
                <div className='flex mg'>
                    <CiCalendarDate size={30} />
                    <input type='date' placeholder='date'
                        className="pop-input" name='date' pattern="\d{4}-\d{2}-\d{2}" value={transactionData[0].date.split('T')[0]} onChange={handleChange} />
                </div>
                <button className='add_transaction' onClick={(e) => handleform(e)}>ADD</button>
               {transactionData[0].update &&
                <button className='add_transaction' onClick={() => {
                    deletetransaction[1](true),
                    handleform()
                }}>DELETE</button>
               } 

                <button className="close-button add_transaction " style={{ backgroundColor: "red" }} onClick={() => {props.setPopupVisible(false),deletetransaction[1](false)}}>
                    close
                </button>
            </div>
        )}

    </>

    );
}

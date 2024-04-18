import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

import { TbDeviceAnalytics } from "react-icons/tb";

import { NavLink } from 'react-router-dom';
import Add_transaction from '../../transaction/component/Add_transaction';
import Add_wallet from './Add_wallet';
import { useAtom } from 'jotai'
import { authAtom, walletVisible as walletVisibleAtom, walletAtom, transactionVisible, transactionAtom } from '../../../atoms/auth.atom';


export default function Sidebar() {
    const [isPopupVisible, setPopupVisible] = useAtom(transactionVisible);
    const [walletVisible, setWalletVisible] = useAtom(walletVisibleAtom);
    const transactionData = useAtom(transactionAtom)
    const [getemail, setEmail] = useAtom(authAtom)
    const getwallet = useAtom(walletAtom)

    return (
        <div className='sidebar font '>
            <div className='upper'>
                <img className="proflie" src="/images/profile.png" width={"70px"} height={"70px"}></img>
                <div className='text font-style-heading'> {getemail.name}</div>
            </div>

            <div className='item font-style'>

                <ul>
                    <NavLink className='link' to='/'>
                        <GoHomeFill />
                        <span>Home</span>
                    </NavLink >
                    <NavLink className='link' to='/transaction'>
                        <FaMoneyBillTransfer />
                        <span>Transaction</span>
                    </NavLink>
                    {/* <NavLink className='link' to='/wallets'>

                    <LiaWalletSolid />


                        <span>Wallets</span>
                    </NavLink > */}
                    <NavLink className='link' to='/anaysis'>

                        <TbDeviceAnalytics />

                        <span>Anaysis</span>
                    </NavLink >
                </ul>

            </div>
            <Add_wallet walletVisible={walletVisible} setWalletVisible={setWalletVisible} />
            <Add_transaction isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible} />
            <div className='lower font-style'>
                <button className={'add_transaction'} style={getwallet[0].update ? { background: "red" } : {}} onClick={() => { setPopupVisible(false), setWalletVisible(true) }} disabled={getwallet.update}>+&nbsp;&nbsp;Add Wallet</button>

                <button className='add_transaction '
                    onClick={() => {
                        setPopupVisible(true),
                            setWalletVisible(false),
                            getwallet[1]({ name: "", balance: "", update: false }),
                            transactionData[1]({
                                email: '',
                                expense: 0,
                                date:  (new Date()).toISOString().split('T')[0],
                                category: '',
                                title: '',
                                mode: true,
                                update: false,
                                wallet_id: null
                            })
                    }}>+&nbsp;&nbsp;Add Transaction</button>
                <NavLink style={{ textDecoration: 'none' }} to='/login'>

                    <button className='red font-style center logout ' onClick={() => setEmail(null)}>
                        <TbLogout />
                        <span  onClick={()=>{window.localStorage.removeItem('token')}}> Logout</span>
                    </button>
                </NavLink>
            </div>



        </div>
    )
}

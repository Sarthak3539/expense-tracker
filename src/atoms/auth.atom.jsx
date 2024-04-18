import { atom } from 'jotai'
export const authAtom = atom(null)
export const walletAtom=atom({name:"",balance:"",update:false})
export const walletVisible=atom(false)
export const transactionAtom=atom({email: '',
expense: 0,
date:(new Date()).toISOString().split('T')[0],
category:'' ,
title: '',
mode: true,
update:false,
wallet_id:null
})
export const transactionVisible=atom(false)

export const wallet_id_atom=atom(null)
const category = ['expense', 'income'];
export const categoryAtom=atom(category[0])
export const deleteTransaction=atom(false)

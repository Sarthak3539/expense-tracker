import { DateRange } from 'react-date-range';
import Dropdown from '../../home/component/Dropdown_input';
import React from 'react'
import { LiaWalletSolid } from "react-icons/lia";
import { MdImportExport } from "react-icons/md";
import { useQueryClient } from "react-query"
import IsoDateConverter from '../../../utils/IsoDateConverter.js';



export default function SearchBar({ state, setState, walletState, categoryState, mutate, setFiltardata,clearfilter }) {
    const queryClient = useQueryClient();

    const category = ['expense', 'income'];

    return (

        <div>

            <div className='pop-up-custom'>
                <form className='font'>
                    <div className="flex-row ">
                        <div className='item-dropdown'>
                            <div> Filter Transaction</div>
                            <div className='flex mg'>
                                <LiaWalletSolid size={30} />
                                <Dropdown state={walletState} options={queryClient.getQueryData(['wallet']).data.wallets} />
                            </div>
                            <div className='flex mg'>
                                <MdImportExport size={30} />
                                <Dropdown    state={categoryState} options={category} />
                            </div>
                        </div>
                    </div>
                </form>
                <div className='cal'>
                    <DateRange
                        rangeColors={['#4A3AFF']}
                        editableDateInputs={true}
                        onChange={item => {
                            setState([item.selection]),setFiltardata(data => ({
                                ...data, "date": {
                                    "$gte": IsoDateConverter(item.selection.startDate),
                                    "$lte": IsoDateConverter(item.selection.endDate)
                                }
                            }))
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    /></div>
                <button type='submit' className='add_transaction' onClick={() => mutate()}>Filter</button>
                <button type='submit' className='add_transaction' onClick={() => clearfilter({})}>clear</button>
            </div>

        </div>
    )
}

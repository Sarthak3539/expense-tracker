import React from 'react'


const arr=[{category:'food',expense:'-500'},{category:'food',expense:'-500'},{category:'food',expense:'-500'},{category:'food',expense:'-500'},{category:'food',expense:'-500'},{category:'food',expense:'-500'}]

const list_item=arr.map(({category,expense},index)=>{
  return (<ul  key={index} className='ul-1 font '>
              <li className='li-1'>{category}</li>
              <li className='li-2'>{expense}</li>
          </ul>)
})


export default function Categery_wise_expense() {
  return (
    <div className='category_wise_expense font '>

    <div>Category wise expense</div>
       <div>
        {list_item}
       </div>
    </div>  

  )
}

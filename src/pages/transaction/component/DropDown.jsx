import React from 'react'

export default function DropDown() {

  const [state, setstate] = React.useState()
  const [data,setData]=React.useState({ first:true,second:true });

  function handleChange(e){   
    const name=e.target.name
    setData({
     ...data,
      [name]:!data[name]
    })
  }


  return (
    <>
      <div className="dropdown" >
        <button className="dropdown-toggle" onClick={() => setstate('open' == state ? "" : 'open')}>Select Options</button>
      <div className={"dropdown-menu " + state}>
        <label><input type="checkbox" className="option-checkbox"   name='first'  onChange={handleChange} checked={data['first']}/> Option 1</label>
        <label><input type="checkbox" className="option-checkbox" name='second' onChange={handleChange} checked={data['second']} /> Option 2</label>
        
      </div>
      </div>
    </>

  )
}

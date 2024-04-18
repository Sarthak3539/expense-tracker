import { useQueryClient } from "react-query"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import React from 'react'
import { NavLink } from "react-router-dom"
    


export default function Box() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({ email: "", password: "", name: "" })
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((formData) => {
            return {
                ...formData,
                [name]: value
            }
        })

    }
    const addUser = (userData) => {
            
    return axios.post('https://expense-tracker-api-eight.vercel.app/auth/register',userData.formData)
    }
    const client = useQueryClient();


    const mut = useMutation(addUser, {
        onError: (e) => alert(e.message),
        onSuccess: (data) => {
          
            client.invalidateQueries(["user"]);
            navigate("/login")
        }
    });
    

    function handleSubmit(e) {
      
        e.preventDefault();
        mut.mutate({
            formData
        })
    }

    return (
        <div className='container' style={{justifyContent:'center',display:'flex'}}>

            <div className='Box'>
                <div className="field">

                    <label htmlFor='name' >Name</label>
                    <input type='text' name='name' placeholder='name' onChange={handleChange} value={formData.name} />
                </div>
                <div className="field">

                    <label htmlFor='email' >Email address</label>
                    <input type='email' name='email' placeholder='Email address' onChange={handleChange} value={formData.email} />
                </div>

                <div className="field">

                    <label htmlFor='password' >Password</label>
                    <input type='password' name='password' placeholder='password' onChange={handleChange} value={formData.password} />
                </div>

                <button type='submit' onClick={handleSubmit}>Register</button>



                <span className='dividor'> or</span>
                <span className='px-12'>already have an account <NavLink to='/login'> sign in </NavLink></span>
            </div>

        </div>
    )
}

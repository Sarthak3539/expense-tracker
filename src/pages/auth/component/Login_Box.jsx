import { useQueryClient } from "react-query"
import axios from 'axios'
import { useMutation } from "react-query"
import React from 'react'
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { authAtom } from "../../../atoms/auth.atom"


export default function Box() {
    const navigate = useNavigate();
    const setEmail=useAtom(authAtom)[1]
    const [formData, setFormData] = React.useState({ email: "", password: "" })
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
        return axios.post('https://expense-tracker-api-eight.vercel.app/auth/login', userData.formData)
    }
    const client = useQueryClient();


    const mut = useMutation(addUser, {
        onError: (e) => {
            alert("wrong email or password")
        },
        onSuccess: (data) => {
            setEmail(data.data)
            window.localStorage.setItem("token",data.data.jwt);
       
            client.invalidateQueries(["user"]);
            navigate("/")
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        mut.mutate({
            formData
        })
    }



    return (
        <div className='container' style={{justifyContent:'center',display:'flex'}}>

            <div className='Box'>
                <form >
                    <div className="field">

                        <label htmlFor='email' >Email address</label>
                        <input type='email' name='email' placeholder='Email address' onChange={handleChange} value={formData.email} autoComplete/>
                    </div>

                    <div className="field">

                        <label htmlFor='password' >Password</label>
                        <input type='password' name='password' placeholder='password' onChange={handleChange} value={formData.password} autoComplete/>
                    </div>
                    <button type='submit' onClick={handleSubmit}>Log in</button>
                </form>

                <a className='px-22'> Forgot your password</a>

                <span className='dividor'> or</span>
                <span className='px-12'>don't have an account <NavLink to='/register'> sign up </NavLink></span>
            </div>

        </div>
    )
}



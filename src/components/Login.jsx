import React, { useState } from 'react'
import {Input, Button} from './index'
import authService from '../backend/auth'
import {login as authLogin} from '../store/features/authSlice'
import {useForm} from "react-hook-form"
import  { useDispatch } from 'react-redux'
import {Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("")
    
    const {register, handleSubmit} = useForm()

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center bg-slate-100 rounded-3xl'>
        <div className="text-center text-2xl font-medium leading-tight">
            <h2>Sign in to your account</h2>
        </div>
        <div className='mt-2 font-light text-base text-center'>
            <p>Don't have an  account? 
                <Link to="/signup" className='hover:underline font-normal'>Sign up</Link>
            </p>
        </div>
        {error && <p className='mb-4 text-red-600 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
            <Input
            label = 'Email:'
            placeholder = 'Enter email address'
            type = 'email'
            className=" bg-white mt-2 px-3 font-serif"
            {...register('email', {
                required : true,
                validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                }
            })}
            />
            <Input
            label = "Password:"
            type = "password"
            placeholder = "Enter your Password"
            {...register('password', {
                required: true,                
            })}
            />
            <Button type='sumbit' className='hover:font-sans mb-7'>Sign In</Button>
        </form>
    </div>
  )
}

export default Login
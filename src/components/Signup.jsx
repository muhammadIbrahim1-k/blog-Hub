import React, { useState } from 'react'
import authService from '../backend/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/features/authSlice'
import {Username, Input, Button} from './index'
import {useForm}  from "react-hook-form";
import { useDispatch } from 'react-redux'


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [account, setAccount] = useState(false)

    const {register, handleSubmit} = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userAcc = await authService.createAccount(data)
            if (userAcc) {
              const userData = await authService.getCurrentUser()
              if (userData) dispatch(authLogin(userData))
              navigate(`/username`)
              setAccount(true)
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <>
    { account? <Username isUpdate={false} /> : <div className='flex flex-col items-center justify-center bg-slate-100 rounded-3xl'>
      <div className="text-center text-2xl font-medium leading-tight">
          <h2>Sign up to create account</h2>
      </div>
      <div className='mt-2 font-light text-base text-center'>
          <p>Already have an  account? 
              <Link to="/login" className='hover:underline font-normal'>Sign In</Link>
          </p>
      </div>
      {error && <p className='mb-4 text-red-600 text-center'>{error}</p>}
       <form onSubmit={handleSubmit(create)}>
          <Input
          label = 'Email:'
          placeholder = 'Enter email address'
          type = 'email'
          className=" bg-white mt-2 px-3 font-serif"
          {...register('signup-email', {
              required : true,
              validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email   address must be a valid address",
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
          <Input
          label = "Confirm Password:"
          type = "password"
          placeholder = "Re-type Password"
          {...register('Confirm-password', {
              required: true,                
          })}
          />
          <Button type='sumbit' className='hover:font-sans mb-7'>Sign up</Button>
      </form>
    </div> }
    </>
  )
}

export default Signup
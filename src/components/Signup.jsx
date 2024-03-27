import React, { useState } from 'react'
import authService from '../backend/auth'
import { Link } from 'react-router-dom'
import { login as authLogin } from '../store/features/authSlice'
import { Input, Button} from './index'
import {useForm}  from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import GoogleAuth from './GoogleAuth'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const isDark = useSelector( state => state.theme.dark )

    const {register, handleSubmit, watch, formState: { errors }} = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userAcc = await authService.createAccount(data)
            if (userAcc) {
              const userData = await authService.getCurrentUser()
              if (userData) dispatch(authLogin(userData))
              navigate('/')
              console.log('Successfully created account');
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className={`${isDark? "dark" : ""}`}>   
        <div className=" bg-white dark:bg-slate-900  rounded-lg shadow-2xl md:mt-0 md:w-full xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    Create Account
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-white ">
                        Already have an account? <Link to={'/login'} className="font-medium dark:text-white text-primary-600 hover:underline ">Login here</Link>
                    </p>
                {error && <p className='mb-4 text-red-600 '>{error}</p>}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(create)}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FULL NAME</label>
                        <Input 
                        type="text" 
                        placeholder="Your Name" 
                        className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        {...register('name', {
                            required: true,
                        })}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMAIL</label>
                        <Input 
                        type="email" 
                        className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        placeholder="name@company.com"
                        {...register('email', {
                            required : true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                            }
                        })}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PASSWORD</label>
                        <Input 
                        type="password" 
                        placeholder="Password" 
                        className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        {...register('password', {
                            required: true,
                        })}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium dark:text-white text-gray-900 ">Confirm password</label>
                        <Input 
                        type="password"
                        placeholder="Re-type Password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        {...register('confirm_password', {
                            required: true,
                            validate: value => value === watch('password') || "The passwords do not match"               
                        })}
                        />
                        {errors.confirm_password && <p className='text-red-600'>{errors.confirm_password.message}</p>}
                    </div>
                    <Button type="submit" className="w-full dark:text-slate-600 dark:bg-slate-300 dark:hover:bg-slate-600 hover:bg-black  hover:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</Button>
                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-500 border-0 rounded md:my-10 "></hr>
                </form>
                <GoogleAuth msg={`Signup with Google`}/>
            </div>
        </div>
    </div>
  )
}

export default Signup
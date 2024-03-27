import React, { useState } from 'react'
import {Input, Button} from './index'
import authService from '../backend/auth'
import {login as authLogin} from '../store/features/authSlice'
import {useForm} from "react-hook-form"
import  { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("")
    const isDark = useSelector( state => state.theme.dark )

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
    <div className={`${isDark? "dark" : ""}`}>
        <div className=" bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    Sign in to your account
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-white">
                    Don't have an  account? <Link to={'/signup'} className="font-medium text-primary-600 hover:underline ">Create One</Link>
                </p>
                {error && <p className='mb-4 text-red-600 '>{error}</p>}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(login)}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMAIL</label>
                        <Input 
                        type="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        {...register('password',{
                            required:true
                        })}
                        />
                    </div>
                    <Button type="submit" className="w-full hover:bg-black hover:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Log In</Button>
                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-500 border-0 rounded md:my-10 "></hr>
                </form>
                <GoogleAuth msg={`Login with Google`} />
            </div>
        </div>
    </div>
  )
}

export default Login
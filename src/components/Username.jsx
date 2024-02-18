import React, {useEffect, useState} from 'react'
import appwriteService from '../backend/config'
import { useDispatch } from 'react-redux'
import {Input, Button} from './index'
import { useNavigate } from 'react-router-dom'

function Username({
    isUpdate = false,
    className='',
    ...props
}) {

    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setUsernameHandler = () => {
        appwriteService.chooseUsername({username})
        .then( () => {navigate('/')} )
        .catch( (error) => error? setError("This username is already taken.") : null)
    }

    const updateUsernameHandler = () => {
        appwriteService.updateUsername()
        .then( dispatch(updateUsername(username)) )
        .then( () => {navigate('/profile')} ) //POSSIBLE NAVIGATION CHANGES
        .catch( (error) => error? setError("This username is already taken.") : null)
    }

    useEffect( () => {
        setError('')
    },[username] )


  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-[30px] font-Raleway cursor-none">
          { isUpdate? <p>Update Username</p> : <p>Choose your username</p>}
        </div>
        <div>
          <Input className={`md:px-5 border outline-none rounded-lg md:pl-2 lg:pl-2 py-2 bg-slate-200 mt-7 px-3 $  {error && 'border-red-500'} `} value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {error && <p className='text-red-500 mb-5'>{error}</p>}
        <div className="hover:bg-black hover:text-white hover:shadow-2xl rounded-md px-4 py-2 font-poppins cursor-pointer" >
        <Button className="hover:shadow-2xl" onClick={ isUpdate? updateUsernameHandler : setUsernameHandler}>{isUpdate? "UPDATE USERNAME" : "LET'S GO"}</Button>
        </div>
        {...props}
    </div> 
  )
}

export default Username
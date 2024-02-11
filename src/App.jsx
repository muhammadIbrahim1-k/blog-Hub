import React, {useEffect, useState}from  'react'
import './style/App.css'
import {useDispatch} from 'react-redux'
import authService from './backend/auth'
import {login, logout} from './store/authSlice'
import { Loading, Header, Footer } from './components/index'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then( (userData) => {
      if (userData){
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    } )
    .catch((error)=> console.error(`Error: SOMETHING WRONG IN APP.JSX${error}`))
    .finally(()=>{setLoading(false)})
  },[])

  return loading? 
  <Loading /> : (
    <></>
  )
}

export default App

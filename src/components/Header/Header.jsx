import React from 'react'
import authService from '../../backend/auth'
import {logout} from '../../store/features/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Logo, DarkBtn, Button, logoutImage} from '../index'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const dispatch = useDispatch()
  const authUser = useSelector( state => state.auth.status )
  const isDark = useSelector( state => state.theme.dark )
  const  navigate = useNavigate()

  const logoutHandler = () => {
    authService.logout()
    .then(
      () => (dispatch(logout()))
    )
    .catch(error => console.log (`Error in Logout (in Header Component) ${error}`))
    .finally( () => navigate('/login') )
  }

  const navItems = [
    {
      name: 'login',
      url: '/login',
      show: !authUser 
    },
    {
      name: 'signup',
      url: '/signup',
      show: !authUser 
    },
    {
      name: 'Home',
      url: '/',
      show: authUser 
    },
    {
      name: 'Write Blog',
      url: '/write-blog',
      show: authUser 
    },
    {
      name: 'Profile',
      url: '/profile',
      show: authUser 
    },
  ]
  
  return (
    <div className={`${isDark? "dark" : ""}`}>
      <header className='w-full  h-16 shadow-lg dark:bg-slate-950 '>
          <nav className='flex md:flex justify-between md:px-4 	'>
            <div className='w-[200px] min-w-[70px]'>
              <Link to={'/'}>
                <Logo />
              </Link>
            </div>
            <div className='flex md:flex ml-auto list-none md:pt-3 text-base space-x-4'>
              {navItems.map( (items) => (
                items.show ? 
                <li key={items.url}>
                  <Button
                  onClick = {() => navigate(items.url)}
                  >{items.name}</Button>
                </li> 
                : null
              ))}
              {authUser && (
                  <li>
                  <button onClick={logoutHandler}><img className=' md:w-7 min-w-7 w-7 pt-1' src={logoutImage} alt="logout" /></button>
                </li>
              )}
            </div>
          </nav>
      </header>
      <div className='dark:bg-slate-900 pt-4'><DarkBtn/></div>
    </div>
  )
}

export default Header
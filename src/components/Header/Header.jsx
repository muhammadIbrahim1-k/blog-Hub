import React from 'react'
import authService from '../../backend/auth'
import {logout} from '../../store/features/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Logo,  Button, Loading} from '../index'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const dispatch = useDispatch()
  const authUser = useSelector( (state) => {state.auth.status} )
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
    <header className='flex items-center justify-between h-16 shadow-lg'>
      <Container>
        <nav>
          <div>
            <Link>
              <Logo width='70px' />
            </Link>
          </div>
          <div>
            {navItems.map( (items) => (
              items.show ? 
              <li key={items.url}>
                <Button
                onClick = {() => navigate(items.url)}
                >{items.name}</Button>
              </li> 
              : <Loading />
            ))}
            {authUser && (
              <li>
                <Button onClick={logoutHandler}>Logout</Button>
              </li>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
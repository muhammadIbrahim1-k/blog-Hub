import React from 'react'
import { useSelector } from 'react-redux'
import logoImage from '../images/Logo.png';
import DarkHeaderLogo from '../images/DarkHeaderLogo.png';

function Logo() {
  const isDark = useSelector( state => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <div>
          <img src={logoImage} alt='Logo' className='dark:hidden'/>
          <img src={DarkHeaderLogo} alt='Logo' className='hidden dark:block'/> 
      </div>
    </div>
  )
}

export default Logo
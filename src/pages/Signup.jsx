import React, { useState } from 'react'
import {Signup as SignupComponent} from '../components/index'
import registrationLogo from '../images/registrationLogo.png';
import DarkREg from '../images/DarkREg.png';
import { useSelector } from 'react-redux'

function Signup() {
  const isDark = useSelector( state => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <div className='dark:bg-slate-900 dark:text-white'>
        <div className='py-7 md:flex md:flex-row flex flex-col '>
          <div className='w-2/3 ml-20 hidden md:flex animated-imageSignup-container'>
            <img src={registrationLogo} alt="pen" className=" dark:hidden"/>
            <img src={DarkREg} alt="Darkpen" className=" hidden dark:block"/>
          </div>
          <div className='md:w-1/3 md:mr-20 md:ml-16 animated-signup-container m-auto'>
            <SignupComponent/>
          </div>
          
        </div>
        <div className="text-center font-light text-4xl py-20	md:py-64 ">
          <p>Empowering voices, sharing stories, and connecting communities</p>
        </div>
      </div>
    </div>
  )
}

export default Signup
import React from 'react'
import {DarkBtn, Login as LoginComponent} from "../components/index"
import registrationLogo from '../images/registrationLogo.png';
import DarkREg from '../images/DarkREg.png';
import { useSelector } from 'react-redux';

function Login() {
  const isDark = useSelector( state => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <div className='dark:bg-slate-900 dark:text-white'>
        <div className='py-7  md:flex md:flex-row  flex-col'>
          <div className='w-2/3 ml-20 hidden md:flex animated-imageLogin-container '>
            <img src={registrationLogo} alt="pen" className=" dark:hidden"/>
            <img src={DarkREg} alt="Darkpen" className=" hidden dark:block"/>
          </div>
          <div className='md:w-1/3 md:mr-20 md:ml-16 animated-login-container m-auto'>
            <LoginComponent/>
          </div>
        </div>
        <div className="text-center font-light text-4xl	md:py-64 py-20">
          <p>Empowering voices, sharing stories, and connecting communities</p>
        </div>
      </div>
    </div>
  )
}

export default Login
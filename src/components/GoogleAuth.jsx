import React from 'react'
import authService from '../backend/auth'
import { useSelector } from 'react-redux'

function GoogleAuth({msg}) {

  const isDark = useSelector( state => state.theme.dark )

  const HandleGoogleAuth = async (data) => {
    try {
      await authService.googleAuth(data);
    } catch (error) {
      console.log(`Google Auth component`, error);
    }
  }

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <div className="flex items-center justify-center ">
        <button className="px-4 py-2 border flex gap-2 dark:text-slate-300 dark:bg-slate-800 border-slate-500 hover:bg-slate-600 dark:border-slate-700 rounded-lg text-slate-700  hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-300 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={HandleGoogleAuth}>
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          <span>{msg}</span>
        </button>
      </div>
    </div>
  )
}

export default GoogleAuth
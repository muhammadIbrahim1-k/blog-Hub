import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darkMode } from '../store/features/themeSlice'
import {darkmodeimg} from './index'

function DarkBtn({className = ""}) {
  const dispatch = useDispatch()
  const isDark = useSelector( state => state.theme.dark )

  const toggleDark = () => {
      dispatch(darkMode())
    }

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <button onClick={toggleDark} className={`w-8 h-8 ml-2 rounded-full dark:bg-white bg-black text-white dark:text-black ${className}` }><img src={darkmodeimg} alt="darkmodeimg" /></button>
    </div>
  )
}

export default DarkBtn

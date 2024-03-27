import React from 'react'
import { useSelector } from 'react-redux'

function Button({
    children,
    type = 'button',
    className = "",
    ...props
}) {
  const isDark = useSelector( state => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <button className={`hover:bg-black transition dark:text-white dark:bg-slate-950 dark:hover:bg-slate-600 ease-out duration-500 hover:text-white hover:shadow-2xl font-serif px-4 py-2 rounded-md ${className}`}{...props}>
          {children}
      </button>
    </div>
  )
}

export default Button
import React, {useId} from 'react'
import { useSelector } from 'react-redux'

function Input({
  label,
  type = 'text',
  className = "",
  ...props
}, ref) {

  const id = useId()
  const isDark = useSelector( state => state.theme.dark )


  return (
    <div className={`${isDark? "dark" : ""}`}>
      <div className='w-full'>
        {label && 
        <label htmlFor='id'>
          {label}
        </label>}
        <input 
        type={type}
        className={`md:px-5 outline-none rounded-lg md:pl-2 lg:pl-2 py-2 my-2 bg-slate-200 px-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white ${className}`}
        ref={ref}
        id={id} 
        {...props}
        />
      </div>
    </div>
  )
}

export default React.forwardRef(Input);
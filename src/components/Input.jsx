import React, {useId} from 'react'

function Input({
  label,
  type = 'text',
  className = "",
  ...props
}, ref) {

  const id = useId()

  return (
    <div className='w-full'>
      {label && 
      <label htmlFor='id'>
        {label}
      </label>}
      <input 
      type={type}
      className={`md:px-5 outline-none rounded-lg md:pl-2 lg:pl-2 py-2 bg-slate-200 m-7 px-3 ${className}`}
      ref={ref}
      id={id} 
      {...props}
      />
    </div>
  )
}

export default React.forwardRef(Input);
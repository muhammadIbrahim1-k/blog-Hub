import React from 'react'

function Button({
    children,
    type = 'button',
    className = "",
    ...props
}) {
  return (
    <button className={`hover:bg-black hover:text-white hover:shadow-2xl font-serif px-4 py-2 rounded-md ${className}`}{...props}>
        {children}
    </button>
  )
}

export default Button
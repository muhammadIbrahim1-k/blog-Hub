import React from 'react'
import { useSelector } from 'react-redux'

function Error({
    errorMsg,
}) {
  const isDark = useSelector( (state) => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <div className="flex flex-col text-center dark:bg-slate-900 ">
          <div className="text-[90px] dark:text-white text-gray-500 font-extralight cursor-none">
            <p>error</p>
          </div>
          <div className="text-[17px] font-serif dark:text-white text-gray-600 cursor-none">
            <p>{errorMsg}</p>
          </div>

      </div>
    </div>
  )
}

export default Error
import React from 'react'
import {Button} from './index'

function Error({
    errorMsg,
    goBackHandler
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
        <div className="text-[90px] text-gray-500 font-extralight cursor-none">
          <p>error</p>
        </div>
        <div className="text-[17px] font-serif text-gray-600 cursor-none">
          <p>`ERROR ||  ${errorMsg}`</p>
        </div>
        <div className="hover:bg-black hover:text-white cursor-pointer m-8 font-thin">
          <Button onClick={goBackHandler}>GO BACK</Button>
        </div>
    </div>
  )
}

export default Error
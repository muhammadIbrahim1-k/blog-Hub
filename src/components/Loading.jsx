import React from 'react'
import {useSelector} from 'react-redux';


function Loading() {
  const isDark = useSelector( (state) => state.theme.dark )

  return (
    <>
    <div className={`${isDark? "dark" : ""}`}>
      <div className="grid place-content-center h-screen dark:bg-slate-600">
          <img className="w-20 h-35 animate-spin" src="https://www.svgrepo.com/show/173880/loading-arrows.svg" alt="Loading icon"/>
      </div>
    </div>
  </>

  )
}

export default Loading
import React, { useState } from 'react'
import appwriteService from '../backend/config'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

function UserBlogCard({$id, title, blogImage}) {
  const isDark = useSelector( state => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <Link to={`/post/${$id}`}>
        <div className='w-full bg-slate-300 rounded-xl p-4 dark:bg-slate-600'>
            {!blogImage? null : <div className='w-full justify-center pb-4'>
                <img src={appwriteService.getFilePreview(blogImage)} alt={title}
              className='rounded-xl' />
            </div>}
          <h2
          className='text-xl font-bold dark:text-slate-200'
          >{title}</h2>
        </div>
      </Link>
    </div>
  )
}

export default UserBlogCard

// component is for user profile
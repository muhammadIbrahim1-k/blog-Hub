import React, { useState } from 'react'
import appwriteService from '../backend/config'
import {Link} from 'react-router-dom'

function UserBlogCard({$id, title, blogImage}) {

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
          {!blogImage? null : <div className='w-full justify-center mb-4'>
              <img src={appwriteService.getFilePreview(blogImage)} alt={title}
            className='rounded-xl' />
          </div>}
        <h2
        className='text-xl font-bold'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default UserBlogCard

// component is for user profile
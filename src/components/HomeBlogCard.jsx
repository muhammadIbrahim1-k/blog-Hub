import React from 'react'
import appwriteService from '../backend/config'
import { Link } from 'react-router-dom'

function HomeBlogCard({$id, userId, username, title, blogImage}) {
  return (
    <div className='flex flex-col items-center justify-center'>
        <Link to={`/profile/${userId}`}>
            <div>
                <div>{username}</div>
            </div>
        </Link>
        <Link to={`/post/${$id}`}>
            <div className='border border-white-600 max-w-lg w-5/6 max-h-full'>
                {!blogImage? null: <div>
                    <img src={appwriteService.getFilePreview(blogImage)} alt={title} className='border border-black h-80'/>
                </div> }
                <div className='bg-slate-100 text-[25px]'>
                    <div>{title}</div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default HomeBlogCard
import React from 'react'
import appwriteService from '../backend/config'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HomeBlogCard({$id, title, blogImage}) {
    const isDark = useSelector( state => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
        <div className='flex flex-col items-center justify-center dark:bg-slate-900 home-blog-card'>
            <Link to={`/post/${$id}`}>
                <div className=' border-white-600  bg-slate-300 rounded-xl max-w-lg w-full dark:bg-slate-600 max-h-full mb-11 '>
                    {!blogImage? null: <div>
                        <img src={appwriteService.getFilePreview(blogImage)} alt={title} className='border border-black h-80'/>
                    </div> }
                    <span className=' dark:text-slate-200 '>
                        <div className='p-4 text-[25px] text-center font-medium'>{title}</div>
                    </span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default HomeBlogCard
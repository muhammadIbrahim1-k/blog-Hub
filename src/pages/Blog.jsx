import React, {useEffect, useState} from 'react'
import appwriteService from '../backend/config'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Loading } from '../components/index'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'

export default function Blog() {
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  const userData = useSelector( (state) => state.auth.userData )
  const isDark = useSelector( (state) => state.theme.dark )

  const isAuthor = post && userData? post.userId === userData.$id : false

  useEffect( () => {
    if (id) {
      appwriteService.getPost(id).then( (post) => {
        if (post) setPost(post);
        else navigate('/')
      } )
    } else navigate('/')
  }, [id, navigate] )


  const handleDeletePost = () => {
    appwriteService.deletePost(post.$id).then((status)=>{
      if (status) {
        appwriteService.deleteFile(post.blogImage);
        navigate('/');
      }
    } );
  }


  return post ? (
    <div className={`${isDark? "dark" : ""}`}>
      <div className='dark:bg-slate-900'>
      <div className='py-8 '>
          <div className='w-full flex flex-col justify-center mb-4 relative dark:border-slate-900 border rounded-xl p-2'>
            <img
              src={appwriteService.getFilePreview(post.blogImage)}
              alt={post.title}
              className='rounded-xl '
            />

            {isAuthor && (
              <div className="mt-2 flex">
                  <Link to={`/edit-blog/${post.$id}`}>
                      <button  className="mr-3 bg-green-500 dark:hover:bg-green-950 dark:bg-green-500 text-white hover:shadow-2xl font-serif px-4 py-2 rounded-md"> Edit </button>
                  </Link>
                  <button className="bg-red-500 dark:bg-red-500 dark:hover:bg-red-900 text-white hover:shadow-2xl font-serif px-4 py-2 rounded-md" onClick={handleDeletePost}> Delete </button>
              </div>
            )}
          </div>
          <div className='px-5'>
            <div className='w-full mb-6'>
              <h1 className='text-2xl dark:text-white font-bold font-serif' >{post.title}</h1>
            </div>
            <div className='browser-css dark:text-white'>
              {parse(post.content)}
            </div>
          </div>
            
      </div></div>
    </div>
  ) : <Loading/>
}


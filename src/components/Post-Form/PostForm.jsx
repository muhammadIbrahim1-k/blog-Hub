import React from 'react'
import appwriteService from '../../backend/config'
import { useNavigate } from 'react-router-dom'
import { useForm } from  "react-hook-form"
import { useSelector } from 'react-redux'
import {Button, Input, RTE, Loading} from '../index'
import { ID } from 'appwrite'

function PostForm({post}) {
    const {register, handleSubmit, control, getValues} = useForm({
        defaultValues: {
            title: post?.title||"",
            content: post?.content || ""
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    const isDark = useSelector( (state) => state.theme.dark )

    const submit = async (data) => {
      if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (file) {
          appwriteService.deleteFile(post.blogImage)
        }

        await appwriteService.updatePost(post.$id, {
          ...data,
          blogImage: file? file.$id : <Loading />
        })
        .finally( () => {navigate('/profile')})

      } else {
        try {
          const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;     
          if (file) {
              const fileId = file.$id
              data.blogImage = fileId
              console.log(`blogImage`, fileId)
              await appwriteService.createPost({
                ...data,
                userId: userData.$id})
                .finally( () => {navigate('/')} )
          }
        } catch (error) {
          console.log(`ERROR POSTING `, error)
        }
      
      }
    }
    

  return (
    <div className={`${isDark? "dark" : ""}`}>
    <form className='flex flex-col justify-center items-center text-center' onSubmit={handleSubmit(submit)}>
      <div className='text-center px-2'>
        <Input 
          placeholder = 'Enter Title for your Blog '
          className = "mb-4"
          {...register('title', {required: true})}
        />
        <RTE name="content" control={control} defaultValue={getValues('content')} />
      </div>
      <div className=' px-2'>
        <Input 
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', {required: !post})}
        />
        {post && (
          <div className='w-full mb-4'>
            <img 
            src={appwriteService.getFilePreview(post.blogImage)}
            alt={post.title} 
            className='rounded-lg'
            />
          </div>
        )}
        <Button type='submit' className=' dark:text-black'>
          {post ? 'Update' : 'Post'}
        </Button>
      </div>
    </form></div>
  )
}

export default PostForm
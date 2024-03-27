import React from 'react'
import { PostForm, Container } from '../components/index'
import { useSelector } from 'react-redux'

function AddBlog() {
  const isDark = useSelector( (state) => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      <div className='py-8 dark:bg-slate-900'>
          <Container>
              <PostForm/>
          </Container>
      </div>
    </div>
  )
}

export default AddBlog
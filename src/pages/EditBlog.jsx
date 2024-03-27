import React,{useState, useEffect} from 'react'
import { PostForm, Container } from '../components/index'
import appwriteService from '../backend/config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditBlog() {
    const [post, setPost] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()
    const isDark = useSelector( (state) => state.theme.dark )

    useEffect( () => {
        if (id) {
            appwriteService.getPost(id).then( (post) => {
                if (post) {
                    setPost(post)
                }
            } )
        } else {
            navigate('/')
        }
    }, [id, navigate] )

  return post? (
    <div className={`${isDark? "dark" : ""}`}>
        <div className='dark:bg-slate-900'>
            <div className='py-8'>
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        </div>
    </div>
  ) : null
}
export default EditBlog
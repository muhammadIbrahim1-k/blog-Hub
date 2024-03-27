import React,{useState, useEffect} from 'react'
import appwriteService from '../backend/config'
import { HomeBlogCard, Container } from '../components/index'
import { useSelector } from 'react-redux'


function Home() {
    const [post, setPost] = useState([])
    const isDark = useSelector( state => state.theme.dark )

    useEffect( () => {
        appwriteService.getAllPosts()
        .then ( (posts) => {
        if (posts) {
            setPost(posts.documents)
        }
    })}, [] )


  return (
    <div className={`${isDark? "dark" : ""}`}>
        <div className='dark:bg-slate-900'>
            <Container>
                <div className='flex flex-col-reverse pt-4'>
                    {post.map( (post) => (
                        <div key={post.$id}>
                            <HomeBlogCard {...post} /> 
                        </div>
                    ) )}
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Home
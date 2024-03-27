import React, {useState, useEffect} from 'react'
import appwriteService from '../backend/config'
import appwriteAuthService from '../backend/auth'
import { UserBlogCard, Error, Button } from '../components/index'
import {useSelector} from 'react-redux';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/index'


function Profile() {
    const [userPost, setUserPost] = useState([]); 
    const [username, setUsername] = useState(null); 
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const userData = useSelector( (state) => state.auth.userData )
    const isDark = useSelector( state => state.theme.dark )
    const authenticatedUserId = userData.$id
    
    useEffect( () => {
        // For User Posts
        appwriteService.getAllUserPosts([ Query.equal('userId', authenticatedUserId) ]).then( (userPost) => {
        if (userPost) {
            setUserPost(userPost.documents)
            setLoading(false)
        } else console.log('error', Error);
    } )

        // For User Email
       appwriteAuthService.getCurrentUser().then( (userEmail) => {
            setUsername(userEmail)
    }) 
    }, [] )
    
  return <> 
    {loading? <Loading/> : <div className={`${isDark? "dark" : ""}`}>
        <div className='dark:bg-slate-900'>
          <div className='text-center dark:text-slate-300 font-extralight md:text-6xl text-2xl pt-2'>
                  <p>{username ? username.email : null}</p>
          </div>
            {!userPost.length==0? 
              <div className='w-full py-8'>
                  <div className='flex flex-wrap m-2'>
                      {userPost.map((Post) => (
                          <div key={Post.$id } className='p-2 md:w-2/5 w-full'>
                              <UserBlogCard {...Post} />
                          </div>
                      ))}
                  </div>
              </div>:
              <div className='mt-20 h-screen'>
                  <Error errorMsg = "Oops! Looks like you don't have any post"/>
                   <div className='text-center '>
                    <Button className='mt-4' onClick={ () => {navigate('/write-blog')} }>WRITE ONE!</Button>
                  </div>
              </div>}
        </div>
    </div>}
  </>
}

export default Profile
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {ProtectedContainer} from './components/index.js'

import AddBlog from './pages/AddBlog.jsx'
import Blog from './pages/Blog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/profile.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:'/login',
        element: (
          <ProtectedContainer authentication={false}>
            <Login />
          </ProtectedContainer>
        )
      },
      {
        path:'/signup',
        element: (
          <ProtectedContainer authentication={false}>
            <Signup />
          </ProtectedContainer>
        ),
      },
      {
        path:'/',
        element: (
          <ProtectedContainer authentication>
            <Home />
          </ProtectedContainer>
        ),
      },
      {
        path:'/write-blog',
        element: (
          <ProtectedContainer authentication>
            <AddBlog />
          </ProtectedContainer>
        ),
      },
      {
        path:'/profile',
        element: (
          <ProtectedContainer authentication>
            <Profile />
          </ProtectedContainer>
        ),
      },
      {
        path:'/edit-blog/:id',
        element: (
          <ProtectedContainer authentication>
            <EditBlog />
          </ProtectedContainer>
        ),
      },
      {
        path: "/post/:id",
        element: <Blog />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

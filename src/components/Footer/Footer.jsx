import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../../images/Logo.png';
import DarkHeaderLogo from '../../images/DarkHeaderLogo.png';
import { useSelector } from 'react-redux'

function Footer() {
  const isAuth = useSelector(state => state.auth.status)
  const isDark = useSelector( state => state.theme.dark )

  return (
    <div className={`${isDark? "dark" : ""}`}>
      {isAuth? null : 
      <footer className="w-full bg-slate-50 space-y-12 pt-8 flex flex-col text-center md:pt-10 dark:bg-slate-900 dark:text-white">
            <div className=" md:text-left md:flex md:justify-between md:flex-row lg:flex lg:flex-row dark:bg-slate-900">
              <div className="  md:pt-1 md:max-w-60 lg:w-70 lg:ml-8 ">
                <div className='md:ml-[-30px] md:w-80 '>
                  <Link to='#'>
                    <img src={DarkHeaderLogo} alt="BlogHub" className='hidden dark:block'/>
                    <img src={logoImage} alt="BlogHub" className='dark:hidden ' />
                  </Link>
                </div>
                <p className="md:ml-5 pt-1 md:pr-2">Discover captivating stories and diverse insights on BlogHub. Your source for engaging content and inspiration</p>
              </div>
              <div className="my-11 md:pt-1 md:px-5">
                <div>
                  <Link className="text-2xl pb-4" to='/'>Company</Link>
                </div>
                <div className="pt-1 md:flex md:flex-col">
                  <Link to='#'>About</Link>
                  <Link to='#' className="py-2">Blog</Link>
                  <Link to='#'>Job</Link>
                  <Link to='#' className="py-2">Press</Link>
                  <Link to='#'>Partners</Link>
                </div>
              </div>
              <div className="my-11 md:pt-1 md:px-5">
                <Link to='/' className="text-2xl pb-4">Legal</Link>
                <div className="pt-1 md:flex md:flex-col">
                  <Link to='#'>Claim</Link>
                  <Link to='#' className="py-2">Privacy</Link>
                  <Link to='#'>Term</Link>
                </div>
              </div>
              <div className="mb-3 md:pt-1 md:mr-5 lg:mr-8 md:px-5">
                <div>
                  <h3 to='#' className="text-2xl">Subscribe</h3>
                  <p className="py-2">Subscribe your Email address for latest news & updates.</p>
                </div>
                <div className="pt-3 px-14">
                  <div className="w-full shadow-xl pt-3 bg-slate-200 dark:bg-slate-700">
                    <input className="md:px-5 outline-none dark:border-slate-600 dark:bg-slate-700  dark:text-white rounded-sm md:pl-2 lg:pl-2 py-2 bg-slate-200 " type="text" placeholder="Enter your Email"/>
                  </div>
                  <div>
                    <button className="bg-black shadow-xl dark:text-slate-600 dark:bg-slate-300 dark:hover:bg-slate-400 hover:bg-slate-500 h-10 text-white w-full" type="submit">SUBSCRIBE</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex pb-7 pl-4">
                <p className="text-xs">© 2024 Blog Hub, Inc. All rights reserved.</p>
                {/* Flex reverse krna yaad rakna */}
                {/* <!-- SOCIAL MEDIA SIGNS --> */}
              </div>
            </div>
          </footer>}
    </div>

  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom'
import {Logo} from '../index'

function Footer() {
  return (
    <footer className="w-full bg-white space-y-12 px-4 pt-8 flex flex-col text-center ">
      <div className=" md:text-left md:flex md:justify-between md:flex-row lg:flex lg:flex-row">
        <div className=" md:ml-5 md:mt-1 w-full lg:w-70 lg:ml-8 ">
          <div>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <p className="pt-1 md:pr-2">Discover captivating stories and diverse insights on BlogHub. Your source for engaging content and inspiration</p>
        </div>
        <div className="my-11 md:mt-1 md:px-5">
          <div>
            <Link className="text-2xl pb-4" to='/'>Company</Link>
          </div>
          <div className="pt-1">
            <Link to='/'>About</Link>
            <Link to='/' className="py-2">Blog</Link>
            <Link to='/'>Job</Link>
            <Link to='/' className="py-2">Press</Link>
            <Link to='/'>Partners</Link>
          </div>
        </div>
        <div className="my-11 md:mt-1 md:px-5">
          <Link to='/' className="text-2xl pb-4">Legal</Link>
          <div className="pt-1">
            <Link to='/'>Claim</Link>
            <Link to='/' className="py-2">Privacy</Link>
            <Link to='/'>Term</Link>
          </div>
        </div>
        <div className="mb-3 md:mt-1 md:mr-5 lg:mr-8 md:px-5">
          <div>
            <Link to={'/'} className="text-2xl">Subscribe</Link>
            <p className="py-2">Subscribe your Email address for latest news & updates.</p>
          </div>
          <div className="mt-3 px-14">
            <div className="w-full shadow-xl mt-3 bg-slate-200">
              <input className="md:px-5 outline-none rounded-sm md:pl-2 lg:pl-2 py-2 bg-slate-200 " type="text" placeholder="Enter your Email"/>
            </div>
            <div>
              <button className="bg-black shadow-xl hover:bg-slate-500 h-10 text-white w-full" type="submit">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex pb-7">
          <p className="text-xs">© 2024 Your Company, Inc. All rights reserved.</p>
          {/* <!-- SOCIAL MEDIA SIGNS --> */}
        </div>
      </div>
    </footer>

  )
}

export default Footer
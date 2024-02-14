import React from 'react'
import logoImage from '../images/logo.png';

function Logo({width = '70px'}) {
  return (
    <div>
        <img src={logoImage} alt='Logo' />
    </div>
  )
}

export default Logo
import React from 'react'
import './Header.css'
import logo from './logo.png'

const Header = () => {
  return (
    <div className='header'>

      <img 
        alt='logo'
        className='logo-image'
        src={logo} 
        data-testid='header-logo' />

        <h4 className='title' data-testid='header-title'>
          <span>Link</span>VOTE Challenge
        </h4>

    </div>
  )
}

export default Header

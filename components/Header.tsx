import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <header className='bg-base-300'>
      <nav className='navbar justify-between'>
        <a><Link href='/' className='text-lg font-extrabold'>AMZ STORE</Link></a>
        <ul>
          <li className='btn btn-ghost rounded-btn'><Link href=''>Cart</Link></li>
          <li className='btn btn-ghost rounded-btn'><Link href=''>Shop Now</Link></li>
          <li className='btn btn-ghost rounded-btn'><Link href=''>Sign In</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;

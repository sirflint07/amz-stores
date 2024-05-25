import Link from 'next/link';
import React from 'react'
import Menu from './Menu';

const Header = () => {
  return (
    <header className='bg-base-300'>
      <nav className='navbar justify-between'>
        <Link href='/' className='text-lg font-extrabold sm:bg-base-200'>AMZ STORE</Link>
        <Menu />
      </nav>
    </header>
  )
}

export default Header;

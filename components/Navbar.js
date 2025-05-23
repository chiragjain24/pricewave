"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';
import NavbarDropdown from './NavbarDropdown';

const Navbar = () => {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
      const includedPaths = ['/products/', '/favourites' , '/profile']
      if (includedPaths.some(path => pathname.includes(path))) {
        window.scroll(0, 0);
      }
      
      setProgress(20)

      const timeout1 = setTimeout(() => {
        setProgress(40);
      }, 200);
    
      const timeout2 = setTimeout(() => {
        setProgress(100);
      }, 400);
    
      return () => {
        // Cleanup previous timeouts when path changes
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };

  }, [pathname])

  return (
    <>
       <nav className='w-full h-16 flex justify-between pl-5 lg:justify-around items-center static shadow-sm border-b lg:sticky top-0 z-10 bg-background/50  backdrop-blur rounded-xl'>
       <LoadingBar
        color='#ef4444'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Link href={'/'} aria-label='HomePage'><div className='flex font-bold text-2xl items-center gap-2'>
            <span><Image src="/assets/icons/logo.svg" width={27} height={27} alt='logo'/></span>
            <span className=' text-black'>Price<span className=' text-red-600'>Wave</span></span>
        </div>
        </Link>
        <ul className='w-fit lg:w-[250px] flex gap-4 lg:gap-5 h-full items-center'>
          <li><Link href='/' aria-label='Search'><Image src="/assets/icons/search.svg" width={28}  height={28} alt='search icon'></Image></Link></li>
          <li><Link href='/favourites' aria-label='Favourites'><Image src="/assets/icons/black-heart.svg" width={28} height={28} alt='favourites icon'></Image></Link></li>
            <NavbarDropdown/>

        </ul>
       </nav>

    </>
  )
}

export default Navbar

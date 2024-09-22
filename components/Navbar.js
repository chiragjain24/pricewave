"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';

const Navbar = () => {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
      setProgress(20)

      setTimeout(() => {
        setProgress(40)
      }, 100);
  
      setTimeout(() => {
        setProgress(100)
      }, 400);

   
  }, [pathname])


  useEffect(() => {
    setTimeout(() => {
     setProgress(0)
    }, 50);
  }, [])


  return (
    <>
       <nav className='w-full h-16 flex justify-around items-center static border-b  lg:sticky top-0 z-10  backdrop-blur rounded-xl'>
       <LoadingBar
        color='#ef4444'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Link href={'/'}><div className='flex font-bold text-2xl items-center gap-2'>
            <span><Image src="/assets/icons/logo.svg" width={27} height={27} alt=''/></span>
            <span className=' text-black'>Price<span className=' text-red-600'>Wave</span></span>
        </div>
        </Link>
        <ul className='flex gap-5 '>
            <Link href='/'><li className='hover:cursor-pointer'><Image src="/assets/icons/search.svg" width={28}  height={28} alt=''></Image></li></Link>
            <Link href='/favourites'><li className='hover:cursor-pointer'><Image src="/assets/icons/black-heart.svg" width={28} height={28} alt=''></Image></li></Link>
            <Link href='/profile'><li className='hover:cursor-pointer'><Image src="/assets/icons/user.svg" width={28} height={28} alt=''></Image></li></Link>
        </ul>
       </nav>

    </>
  )
}

export default Navbar

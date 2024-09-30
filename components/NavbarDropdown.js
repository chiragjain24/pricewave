"use client"
import {signOut, useSession} from 'next-auth/react'
import Link from 'next/link'
import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'
const NavbarDropdown = () => {
    const [userData, setUserData] = useState({name: '', email: '', profilePic: ''})
    const { data: session } = useSession()
    useEffect(() => {
    setUserData({name: session?.user?.name, email: session?.user?.email, profilePic: session?.user?.image});
    }, [session])

    const [showDropdown, setshowDropdown] = useState(false);

  return (
    <>
    <div className='h-full flex items-center'>

    {!session && 
            <Link href='/auth/login'>
                <li className='hover:cursor-pointer pr-5 '><Image src="/assets/icons/user.svg" width={28} height={28} alt=''></Image></li>
            </Link>
}
            {session && userData.name && 
          <>

  <div className='relative w-fit h-full flex items-center' onMouseEnter={()=>{setshowDropdown(true)}} onMouseLeave={()=>{setshowDropdown(false)}} >
    <button onClick={()=>{setshowDropdown(true)}} className="flex items-center text-base pe-1 font-medium rounded-full  md:me-0 " type="button">
        {userData.profilePic &&  <Image unoptimized width={28} height={28} className=" w-7 h-7 me-2 rounded-full" src={userData?.profilePic} alt="user photo"/> }
        <span className='text-black hidden lg:block'> {userData?.name?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()).split(' ')[0].slice(0,15)} </span>
        <svg width="28px" height="28px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
    </button>
    
    <div onClick={()=>{setshowDropdown(false)}} className={`z-10 absolute top-[55px] right-0 sm:left-0 ${(showDropdown?"":"hidden")} text-black  rounded-lg shadow w-24 sm:w-fit bg-gray-50`}>
        <div className="px-4 py-3 text-sm hidden sm:block">
          <div className="font-medium ">Pro User</div>
          <div className="truncate">{session.user.email}</div>
        </div>
        
        <div className='bg-gray-400 h-0.5 hidden sm:block'></div>

        <ul className="py-2 text-sm" >
          <li>
            <Link href="/favourites" className="block px-4 py-2 hover:bg-gray-300 ">My Products</Link>
          </li>
          <li>
            <Link href="/#trending" className="block px-4 py-2 hover:bg-gray-300 ">Trending</Link>
          </li>
          <li>
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-300 ">Settings</Link>
          </li>
          <li onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-300 hover:cursor-pointer">Log out</li>
        </ul>
    </div>
  </div>
  
            
      
          </>
        }


    </div>
    </>
  )
}

export default memo(NavbarDropdown)


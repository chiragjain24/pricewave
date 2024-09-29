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
    <div className='w-[200px] h-full flex items-center'>

    {!session && 
            <Link href='/auth/login'>
                <li className='hover:cursor-pointer'><Image src="/assets/icons/user.svg" width={28} height={28} alt=''></Image></li>
            </Link>
}
            {session && userData.name && 
          <>

  <div className='relative w-fit h-full flex items-center' onMouseEnter={()=>{setshowDropdown(true)}} onMouseLeave={()=>{setshowDropdown(false)}} >
    <button onClick={()=>{setshowDropdown(true)}} className="flex items-center text-base pe-1 font-medium rounded-full  md:me-0 text-white dark:text-white" type="button">
        {userData.profilePic &&  <img className=" w-8 h-8 me-2 rounded-full" src={userData.profilePic} alt="user photo"/> }
        <span className='text-black hidden lg:block'> {userData?.name?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()).split(' ')[0].slice(0,15)} </span>
        <svg width="28px" height="28px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
    </button>
    
    <div onClick={()=>{setshowDropdown(false)}} className={`z-10 absolute top-[55px] right-0 sm:left-0 ${(showDropdown?"":"hidden")}  rounded-lg shadow w-24 sm:w-fit bg-gray-700`}>
        <div className="px-4 py-3 text-sm text-white hidden sm:block">
          <div className="font-medium ">Pro User</div>
          <div className="truncate">{session.user.email}</div>
        </div>
        
        <div className='bg-gray-100 h-0.5 hidden sm:block'></div>

        <ul className="py-2 text-sm text-gray-200" >
          <li>
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Settings</Link>
          </li>
          <li>
            <Link href="/favourites" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">My Products</Link>
          </li>
          <li onClick={() => signOut()} className=" hover:cursor-pointer block px-4 py-2 text-sm  text-gray-200 hover:text-white">Log out</li>
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


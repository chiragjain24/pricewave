"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react"
import Image from 'next/image';
const Page = () => {
  const { status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace('/favourites');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <>
              <div className='h-[80vh] flex flex-col justify-center gap-5'> 


<h2 className="text-2xl  font-semibold mt-4 text-center">
    Login Now to start Tracking
</h2>

      <div className=' flex flex-col items-center justify-center gap-5'>
        <div className='bg-white px-8  flex flex-col gap-3 rounded-3xl text-black  py-5'>
          <div className='flex gap-5 items-center border-2 border-gray-300 text-base px-5 py-3 rounded-xl hover:bg-gray-100 hover:cursor-pointer' onClick={() => signIn('google')}>
            <Image src="https://authjs.dev/img/providers/google.svg" width={25} height={25} alt="" />
            <button className='mr-8 text-black'>Sign in with Google</button>
          </div>
          <div className='flex gap-5 items-center border-2 border-gray-300 text-base px-5 py-3 rounded-xl hover:bg-gray-950 hover:cursor-pointer bg-gray-900' onClick={() => signIn('github')}>
            <Image className='invert' src="https://authjs.dev/img/providers/github.svg" width={25} height={25} alt="" />
            <button className='mr-8 text-white'>Sign in with Github</button>
          </div>
          <div className='flex gap-5 items-center border-2 border-gray-300 text-base px-5 py-3 rounded-xl hover:bg-blue-800 hover:cursor-pointer bg-blue-700' onClick={() => signIn('discord')}>
            <Image  src="https://authjs.dev/img/providers/discord.svg" width={25} height={25} alt="" />
            <button className='mr-8 text-white'>Sign in with Discord</button>
          </div>
        </div>

      </div>

      <p className="text-sm text-gray-600 mt-2 text-center">
                  Get Notified of Price Drop right in your inbox!
                  </p>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Never miss a bargain again with our timely alerts!
                  </p>


              </div>
    </>
  )
}

export default Page
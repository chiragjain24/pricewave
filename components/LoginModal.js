
'use client'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import { signIn} from "next-auth/react"
const LoginModal = ({openModal,setOpenModal}) => {
  const closeModal=()=>setOpenModal(false);

  return (
    <>

    <Dialog open={openModal} onClose={setOpenModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="p-7 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <Image 
              src="/assets/icons/x-close.svg"
              alt="close"
              width={30}
              height={30}
              className="cursor-pointer w-[30px] h-[30px] absolute top-3 right-3"
              onClick={closeModal}
            />
              <div className='flex flex-col'> 


                  <h2 className="text-2xl  font-semibold mt-4 text-center">
                      Login Now to start Tracking
                  </h2>
                  
                  <div className='flex flex-col items-center justify-center gap-5'>
                    <div className='bg-white   flex flex-col gap-3 rounded-3xl text-black  py-5'>
                      <div className='flex gap-5 items-center border-2 border-gray-300 text-base px-5 py-3 rounded-xl hover:bg-gray-100 hover:cursor-pointer' onClick={() => signIn('google')}>
                        <Image src="https://authjs.dev/img/providers/google.svg" width={25} height={25} alt="" />
                        <button className='mr-2 text-black'>Sign in with Google</button>
                      </div>
                      <div className='flex gap-5 items-center border-2 border-gray-300 text-base px-5 py-3 rounded-xl hover:bg-gray-950 hover:cursor-pointer bg-gray-900' onClick={() => signIn('github')}>
                        <Image className='invert' src="https://authjs.dev/img/providers/github.svg" width={25} height={25} alt="" />
                        <button className='mr-2 text-white'>Sign in with Github</button>
                      </div>
                      <div className='flex gap-5 items-center border-2 border-gray-300 text-base px-5 py-3 rounded-xl hover:bg-blue-800 hover:cursor-pointer bg-blue-700' onClick={() => signIn('discord')}>
                        <Image  src="https://authjs.dev/img/providers/discord.svg" width={25} height={25} alt="" />
                        <button className='mr-2 text-white'>Sign in with Discord</button>
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>

  </>
  )
}
export default LoginModal
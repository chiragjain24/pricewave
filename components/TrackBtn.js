"use client"
import { useSession, signIn } from "next-auth/react"
import { useState } from 'react'
import LoginModal from './LoginModal'
import Link from "next/link"
import Image from "next/image"
const TrackBtn = ({productUrl}) => {
  const { data:session } = useSession()
  const [openModal, setOpenModal] = useState(false)
  const handleClick = () => {
    console.log(session?.user);
    if(!session) setOpenModal(true);
  }
  return (
    <>
      <LoginModal openModal={openModal} setOpenModal={setOpenModal}/>

      <button onClick={handleClick} className="w-1/2 py-3  bg-[#282828] hover:bg-black rounded-full text-white text-base  font-semibold">
        Track
      </button>

      <Link className="w-1/2 py-3  bg-[#282828] hover:bg-black rounded-full text-white text-base  font-semibold" href={productUrl} target="_blank">
              <div className="flex w-full justify-center gap-2  ">
                  <Image
                    src="/assets/icons/bag.svg"
                    alt="bag"
                    width={18}
                    height={18}
                  />
                  <span className="">Buy Now</span>
              </div>
      </Link>

    </>
  )
}
export default TrackBtn 
"use client"
import { useSession, signIn } from "next-auth/react"
import { useState } from 'react'
import LoginModal from './LoginModal'
import Link from "next/link"
import Image from "next/image"
const TrackBtn = ({productUrl}) => {
  const { session } = useSession()
  const [openModal, setOpenModal] = useState(false)
  const handleClick = () => {
    if(!session) setOpenModal(true);
  }
  return (
    <>
      <LoginModal openModal={openModal} setOpenModal={setOpenModal}/>

      <button onClick={handleClick} className="w-1/2 py-3  bg-[#282828] hover:bg-black rounded-full text-white text-base  font-semibold">
        Track
      </button>

      <Link className="w-1/2" href={productUrl} target="_blank">
              <div className="border-2 flex w-full py-3 justify-center gap-2 bg-[#282828] hover:bg-black rounded-full text-white text-base  font-semibold">
                  <Image
                    src="/assets/icons/bag.svg"
                    alt="bag"
                    width={22}
                    height={22}
                  />
                  <span className="">Buy Now</span>
              </div>
      </Link>

    </>
  )
}
export default TrackBtn 
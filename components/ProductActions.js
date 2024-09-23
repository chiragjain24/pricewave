"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { scrapeAndCheckProduct } from '@/lib/actions'
import { useSession} from "next-auth/react"
import LoginModal from './LoginModal'

const ProductActions = (props) => {
    const { session } = useSession()
    const [openModal, setOpenModal] = useState(false)
    
    const [isLoading, setIsLoading] = useState(false);
    const handleShare = () => {
        try{
            navigator.share({
                title: 'PriceWave',
                text: `Check out this product: ${props.title}`,
                url: window.location.href
            })
        }
        catch (error) {
            console.log("Error sharing");
        }
    }
    // navigator.clipboard.writeText(text);
    const handleRefresh = async () => {
      setIsLoading(true);
        try{
          await scrapeAndCheckProduct(props.productUrl)
        }
        catch (error) {
          console.log("Error refreshing");
        }
        finally{
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
    }
    const handleSave = () => {
      if(!session) setOpenModal(true);
    }
  return (
    <>
        <LoginModal openModal={openModal} setOpenModal={setOpenModal}/>
        <div className="flex items-center gap-3">
            <div onClick={handleShare} className="p-2 bg-[#EDF0F8] rounded-lg hover:cursor-pointer">
              <Image
                src="/assets/icons/share.svg"
                alt="share"
                width={25}
                height={25}
              />
            </div>

            <div onClick={handleSave} className="p-2 bg-[#FFF0F0] rounded-lg hover:cursor-pointer">
              <Image
                src="/assets/icons/red-heart.svg"
                alt="heart"
                width={25}
                height={25}
              />
            </div>
 

            <div className="text-sm text-black opacity-50 italic w-full flex items-center gap-3 lg:gap-5 lg:pl-16 k">
                <div className="flex flex-col">
                  <div>
                    Created at: {formatDate(props.createdAt)}
                  </div>
                  <div className="flex gap-3">
                  Updated at: {formatDate(props.updatedAt)}
                  </div>
                </div>
                <button disabled={isLoading} onClick={handleRefresh} className='hover:cursor-pointer' >
                    <Image src='/assets/icons/refresh.png' width={30} height={1} alt=""></Image>
                    {isLoading && <p>Updating...</p>}
                </button>

            </div>
        </div>
    </>
  )
}

export default ProductActions



export const formatDate =(input)=>{
    const date = new Date(input);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true  
    };
  
    return date.toLocaleString('en-US', options);
  }

"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { addProductToUser, deleteProductFromUser, scrapeAndCheckProduct } from '@/lib/actions'
import { useSession} from "next-auth/react"
import LoginModal from './LoginModal'
import { productsContext } from '@/context/context'
import { toast } from 'react-toastify'

const ProductActions = (props) => {
    const { data: session } = useSession()
    const [openModal, setOpenModal] = useState(false)
    
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
      const productIndex = recentlyViewed.findIndex(item => item._id === props.localProduct._id);
      
      if (productIndex !== -1) {
      recentlyViewed.splice(productIndex, 1);
      }
      
      recentlyViewed.unshift(props.localProduct);
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [props.localProduct]);
    
    const handleShare = () => {
        try{
            navigator.share({
                title: 'PriceWave',
                text: `Track this product: ${props.localProduct.title} `,
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
          console.log(new Date(), "Refreshing start");
          await scrapeAndCheckProduct(props.productUrl)
          console.log(new Date(), "Refreshing end ");
          toast.success("Updated", {
            position: "top-right",
            autoClose: 4000, 
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          
      } catch (error) {
          console.log("Error refreshing");
          toast.warn("Oops. Try again", {
            position: "top-right",
            autoClose: 4000, 
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
        finally{
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
    }
    const {savedProducts, setSavedProducts} = useContext(productsContext);

    const handleSave = () => {
      const productId= props.localProduct._id;
      if(session){
        if(savedProducts[productId]){
          deleteProductFromUser(session.user.email, productId);
          setSavedProducts((prev) => {
              delete prev[productId];
              return {...prev}
          })
        }
        else{
          addProductToUser(session.user.email, productId);
          setSavedProducts((prev) => {
              return {...prev, [productId]:true}
          })
          toast.success("Now Tracking", {
            position: "top-center",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
  
        }

        return;
      }
      setOpenModal(true);
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

            <div onClick={handleSave} className={'p-2 bg-[#FFF0F0]  rounded-lg hover:cursor-pointer'}>
              {savedProducts[props.localProduct._id] &&
                <Image
                  src="/assets/icons/red-heart-full.png"
                  alt="heart"
                  width={25}
                  height={25}
                />
              } 
              {!savedProducts[props.localProduct._id] &&
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={25}
                  height={25}
                />
              }

            </div>
 

            <div className="text-sm text-black opacity-50 w-full flex items-center gap-3 lg:gap-5 lg:pl-16 k">
                <div className="flex flex-col">
                  <div>
                    First Created : {formatDate(props.createdAt)}
                  </div>
                  <div className="flex gap-3">
                  Last Updated : {formatDate(props.updatedAt)}
                  </div>
                </div>
                <button aria-label="update" disabled={isLoading} onClick={handleRefresh} className='hover:cursor-pointer' >
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
  
    return date.toLocaleString('en-IN', options);
  }

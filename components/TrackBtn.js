"use client"
import { useSession} from "next-auth/react"
import { useContext, useState } from 'react'
import LoginModal from './LoginModal'
import Link from "next/link"
import Image from "next/image"
import { addProductToUser, deleteProductFromUser } from "@/lib/actions"
import { productsContext } from "@/context/context"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const TrackBtn = ({productUrl,productId}) => {
  const { data:session } = useSession()
  const [openModal, setOpenModal] = useState(false)
  const {savedProducts, setSavedProducts} = useContext(productsContext);

  const handleClick = () => {
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

      <button onClick={handleClick} className="w-1/2 py-3  bg-[#282828] hover:bg-black rounded-full text-white text-base  font-semibold">
        {savedProducts[productId]?'Tracked':'Track'}
      </button>

      <Link className="w-1/2 py-3  bg-[#282828] hover:bg-black rounded-full text-white text-base  font-semibold" href={productUrl} target="_blank">
              <div className="flex w-full justify-center gap-2  ">
                  <Image
                    src="/assets/icons/bag.svg"
                    alt="bag"
                    width={24}
                    height={24}
                  />
                  <span className="">Buy Now</span>
              </div>
      </Link>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        />

    </>
  )
}
export default TrackBtn 
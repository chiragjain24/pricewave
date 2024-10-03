"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react"
import { getSavedProductsDetails } from '@/lib/actions';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const FavouritesPage = () => {

    const { data:session , status } = useSession()
    const router = useRouter();
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace('/auth/login');
    }
  }, [status, router]);


  const updateData = async () => {
    const data=await getSavedProductsDetails(session.user.email);
    setAllProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    if(session) updateData();

  }, [session]);

  useGSAP(()=>{
    if(allProducts.length===0) return;
    
    gsap.fromTo('.dp', {y: 40, opacity: 0}, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.dp',
        start: 'top bottom',
      }
    });
    gsap.fromTo('.heading', {opacity: 0}, {
      opacity: 1,
      duration: 1,
    });

    return ()=>{
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  },[allProducts])

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {allProducts.length!==0 && (
            <div className="w-5/6 mx-auto mt-10 lg:mt-20 mb-10">
                <h2 className="heading text-[#282828] text-4xl font-semibold">Your Products:</h2>
                <section className="grid lg:grid-cols-4 gap-5 mt-5 grid-cols-1 sm:grid-cols-2">
                    {allProducts?.map((item) => (
                    <ProductCard key={item._id} product={item} />
                    ))}
                </section>
            </div>
      )}
      {!loading && allProducts.length===0 && 
        <div className="w-5/6 mx-auto mt-10 lg:mt-20 mb-10">
          <h2 className="text-[#282828] text-4xl font-semibold">No products saved</h2>
        </div>
      }
    </>
  )
}

export default FavouritesPage

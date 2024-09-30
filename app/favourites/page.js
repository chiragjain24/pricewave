"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react"
import { getSavedProductsDetails } from '@/lib/actions';

const FavouritesPage = () => {
    const { data:session , status } = useSession()
    const router = useRouter();
    const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace('/auth/login');
    }
  }, [status, router]);


  const updateData = async () => {
    const data=await getSavedProductsDetails(session.user.email);
    setAllProducts(data);
  }

  useEffect(() => {
    if(session) updateData();

  }, [session]);

  
  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <>
      {allProducts.length!==0 && (
            <div className="w-5/6 mx-auto mt-10 lg:mt-20 mb-10">
                <h2 className="text-[#282828] text-4xl font-semibold">Your Products:</h2>
                <section className="grid lg:grid-cols-4 gap-5 mt-5 grid-cols-1 sm:grid-cols-2">
                    {allProducts?.map((item) => (
                    <ProductCard key={item._id} product={item} />
                    ))}
                </section>
            </div>
      )}
    </>
  )
}

export default FavouritesPage

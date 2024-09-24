"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';


const RecentlyViewed = () => {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
      // This code will only run on the client-side
      const storedProducts = localStorage.getItem('recentlyViewed');
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        setAllProducts(products.slice(0, 4)); // Only get the first 4 products
      }
      }, []);
    
    
  return (
    <>
        {allProducts.length!==0 && (
            <div className="w-5/6 mx-auto mt-10 lg:mt-20 mb-10">
                <h2 className="text-[#282828] text-4xl font-semibold">Recently viewed:</h2>
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

export default RecentlyViewed


"use client"
import ProductCard from './ProductCard'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useState } from 'react'
gsap.registerPlugin(ScrollTrigger)

const HomeProducts = ({products}) => {
  const [rowSize, setRowSize] = useState(4)

  useEffect(() => {
    if(window.innerWidth < 640) {
      setRowSize(1)
    }
    else if(window.innerWidth < 1024){
      setRowSize(2)
    } 
    else {
      setRowSize(4)
    }
  
  }, [])

  useGSAP(() => {
    const elements = gsap.utils.toArray('.dp'); // Get all grid items
    
    // We are assuming 4 columns in the grid, so we'll group elements into rows of 4
    // const rowSize = 4;

    for (let i = 0; i < elements.length; i += rowSize) {
        const rowElements = elements.slice(i, i + rowSize); // Get each row (4 elements)

        // Apply animation to each row group of elements
        gsap.fromTo(
            rowElements, // Target this specific row's elements
            { y: 40, opacity: 0 }, // Initial state: Below position and invisible
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2, // Stagger between elements in this row
                scrollTrigger: {
                    trigger: rowElements[0], // Use the first element of the row as the trigger
                    start: 'top 90%', // Start when the row enters the viewport
                    toggleActions: 'play none none none', // Play the animation when entering the viewport
                    once: true // Animate only once
                }
            }
        );
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}, [rowSize]);

  return (
    <div>
        <section className="grid lg:grid-cols-4 gap-5 mt-5 grid-cols-1 sm:grid-cols-2">
            {products?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>
    </div>
  )
}

export default HomeProducts

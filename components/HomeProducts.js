"use client"
import ProductCard from './ProductCard'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const HomeProducts = ({products}) => {
    useGSAP(()=>{
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
    },[])

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

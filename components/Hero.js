"use client"

import React, { memo, useContext, useEffect } from 'react'
import SearchBar from './SearchBar'
import HeroCarousel from './HeroCarousel'
import Image from 'next/image'
import gsap from 'gsap'
import { HeroAnimationContext } from '@/context/context'

  const Hero = ({carouselProducts}) => {

    const { hasAnimated, setHasAnimated } = useContext(HeroAnimationContext);
    useEffect(() => {
      // if(!hasAnimated) {
      //   setHasAnimated(true);
        const animation = gsap.to('.ani1',{
          opacity: 1,
          duration: 1,
          y: 0,
          stagger: 0.3
        });
        return () => {
          animation.kill(); 
        };

      // }
      
  
    }, []);

  return (
    <>
      <div className="mains flex mx-auto gap-20 lg:min-h-[calc(100vh-64px)] items-center w-full lg:w-5/6 flex-col lg:flex-row">

        <div className="pt-10 lg:pt-0 h-full flex flex-col justify-center  gap-5 lg:w-7/12 w-10/12 text-center lg:text-left">
          <div className="ani1 items-center hidden lg:flex">
            <span className="text-base text-red-600">Smart Shopping Starts Here:&nbsp;</span>
            <span><Image src="/assets/icons/arrow-right.svg" width={16} height={16} alt=""></Image></span>
          </div>
          <h1 className="-z-10 ani1 text-6xl font-semibold flex flex-col gap-2">
            <span >Unleash the Power of</span>
            <span className="text-red-600">PriceWave</span>
          </h1>
          <p className="ani1 text-lg">Track product prices effortlessly and save money on your online shopping</p>
          <SearchBar />
          <p className="ani1 text-sm italic ">Only Amazon links are supported yet</p>
        </div>

        <div className="hidden lg:flex h-full lg:min-h-[500px] min-h-[400px] lg:w-5/12 w-10/12 items-center justify-center bg-gray-100 rounded-3xl ">
          <HeroCarousel carouselProducts={carouselProducts}/>
        </div>

      </div>

    </>
  )
}

export default memo(Hero)

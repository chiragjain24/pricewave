"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const heroImages = [
    { imgUrl: '/assets/images/hero-2.jpg', alt: 'earbuds'},
    { imgUrl: '/assets/images/hero-3.jpg', alt: 'smartphone'},
    { imgUrl: '/assets/images/hero-1.jpg', alt: 'smartwatch'},
    { imgUrl: '/assets/images/hero-4.jpg', alt: 'book'},
    { imgUrl: '/assets/images/hero-5.svg', alt: 'chair'},
  ]

  

const HeroCarousel = () => {
  const router = useRouter();
  const handleCarouselClick = (idx) => {
    if(idx==0) router.push('/products/66ee7017f2e8c6679c6d3ca5');
    else if(idx==1) router.push('/products/66ee6fdbf2e8c6679c6d0b32');
    else if(idx==2) router.push('/products/66ee7041f2e8c6679c6d6084');
    else if(idx==3) router.push('/products/66ee7116f2e8c6679c6e15b4');
    else if(idx==4) router.push('/');
  }
  return (
    <>
    <div className='select-none '>

         
    <div className='select-none w-[400px] p-10 mx-auto flex items-center justify-center'>
      <div className='bg-transparent p-2 rounded-3xl hover:cursor-pointer'>
        <div className='p-3 rounded-xl bg-white'>


        <Carousel
            onClickItem={handleCarouselClick}
            showThumbs={false}
            emulateTouch={true}
            autoPlay
            infiniteLoop
            interval={3500}
            showArrows={false}
            showStatus={false}
            >
            {heroImages.map((image) => (
              <Image 
              src={image.imgUrl}
              alt={image.alt}
              width={300}
              height={300}
              className='w-[300px] h-[300px] object-contain'
              key={image.alt}
              
              />
            ))}
        </Carousel>
            </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default HeroCarousel

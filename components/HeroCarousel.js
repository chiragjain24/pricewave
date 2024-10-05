"use client"
import React, { memo } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// const heroImages = [
//     { imgUrl: 'https://m.media-amazon.com/images/I/61-ZYvldY+L._SY355_.jpg', alt: 'earbuds'},
//     { imgUrl: 'https://m.media-amazon.com/images/I/71OXmy3NMCL._SX385_.jpg', alt: 'smartphone'},
//     { imgUrl: 'https://m.media-amazon.com/images/I/61GdCtUjrLL._SY355_.jpg', alt: 'smartwatch'},
//     { imgUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SY466_.jpg', alt: 'book'},
//     { imgUrl: 'https://m.media-amazon.com/images/I/61-pxrLNW+L._SX425_.jpg', alt: 'router'},
//   ]

  

const HeroCarousel = ({carouselProducts}) => {
  const router = useRouter();
  const handleCarouselClick = (idx) => {
    router.push(`/products/${carouselProducts[idx]._id}`);
    // if(idx==0) router.push('/products/66ee7017f2e8c6679c6d3ca5');
    // else if(idx==1) router.push('/products/66ee6fdbf2e8c6679c6d0b32');
    // else if(idx==2) router.push('/products/66ee7041f2e8c6679c6d6084');
    // else if(idx==3) router.push('/products/66ee7116f2e8c6679c6e15b4');
    // else if(idx==4) router.push('/products/66f1a8ab3f9f8e27bdc34a01');
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
            interval={2500}
            showArrows={false}
            showStatus={false}
            >
              {carouselProducts.map((product) => (
                <Image 
                src={product.image}
                alt={product.title.slice(0, 16)}
                width={300}
                height={300}
                className='w-[300px] h-[300px] object-contain'
                key={product._id}
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

export default memo(HeroCarousel)

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const ProductCard = ({product}) => {
  return (
    <>
    <Link href={`/products/${product._id}`} className="">
      <div className='border-2 rounded-xl px-5 py-3 flex flex-col gap-3'>
      
        <div className="flex items-center justify-center h-[200px]">
          <Image 
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="object-contain w-[200px] h-[200px]"
          />
        </div>

        <div className="">
          <h3 className="truncate">{product.title}</h3>

          <div className="">
            <p className="">
              {product.category}
            </p>

            <p className="">
              <span>{product.currency}</span>
              <span>{product.currentPrice}</span>
            </p>
          </div>
        </div>
      </div>

      </Link>
    </>
  )
}

export default ProductCard
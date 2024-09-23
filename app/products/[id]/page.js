import { getAllProductsId, getProductById } from "@/lib/actions"
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductActions from "@/components/ProductActions";
import TrackBtn from "@/components/TrackBtn";


const ProductDetails = async ({ params: { id }}) => {
  const product = await getProductById(id);
  if (!product) {
    notFound()
  }

  return (
    <>
      <div className='flex w-full px-5 lg:px-20 py-10 min-h-[calc(100vh-64px)] gap-10 flex-col lg:flex-row'>
        <div className="lg:w-2/5  items-center justify-center hidden lg:flex ">
          <div className="border border-[#CDDBFF] p-5 rounded-xl">
          <Link
            href={product.url}
            target="_blank">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="mx-auto "
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:w-3/5 ">

          <p className="text-xl lg:text-2xl text-[#282828] font-semibold">
            {product.title}
          </p>

          <Link
            href={product.url}
            target="_blank"
            className="text-base text-black opacity-50"
          >
            Visit Product
          </Link>
          
          <ProductActions title={product.title} productUrl={product.url} createdAt={product.createdAt} updatedAt={product.updatedAt}   />
          

          <div className="flex flex-col gap-5">
              <div className="flex gap-5 flex-wrap my-2 justify-center lg:justify-start">
                  <div className="flex items-center justify-center lg:hidden border border-[#CDDBFF] w-[160px]">
                    <Link
                      href={product.url}
                      target="_blank">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={50}
                        height={50}
                        />
                      </Link> 
                  </div>

                <PriceInfoCard
                  title="Average Price"
                  iconSrc="/assets/icons/chart.svg"
                  value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                />
                <PriceInfoCard
                  title="Lowest Price"
                  iconSrc="/assets/icons/arrow-down.svg"
                  value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                />
                <PriceInfoCard
                  title="Highest Price"
                  iconSrc="/assets/icons/arrow-up.svg"
                  value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                />
              </div>
            </div>



          <div className="flex items-center flex-wrap gap-3 lg:gap-10 py-6 border-y border-y-[#E4E4E4] ">
            <div className="flex flex-col gap-2">
              <p className="text-2xl text-[#282828] font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-base text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.mrp)}
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <div className="flex gap-3 lg:gap-5">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-full">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-[#D48D3B] font-semibold">
                    {product.stars}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-[#EDF0F8] rounded-full">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-[#282828] font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                &nbsp;

              <span className="text-[#3E9242] font-semibold">93% </span> of
              buyers have recommeded this.
            </p>
            </div>
          </div>

          <div className="flex gap-5">
            <TrackBtn productUrl={product.url}/>
          </div>


        </div>


      </div>
    
    </>
  )
}

export default ProductDetails

const formatNumber = (num = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const metadata = {
  title: 'PriceWave | Product Details',
}

export async function generateStaticParams() {
  const paths=await getAllProductsId();
  return paths;
}



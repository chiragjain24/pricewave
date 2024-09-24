import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";

export default async function Home() {
  const allProducts = await getAllProducts();
  return (
    <>
      <div className="flex mx-auto gap-20 min-h-[calc(100vh-64px)] items-center w-full lg:w-5/6 flex-col lg:flex-row">
      
        <div className="pt-10 lg:pt-0 h-full flex flex-col justify-center  gap-5 lg:w-7/12 w-10/12 text-center lg:text-left">
          <div className="items-center hidden lg:flex">
            <span className="text-base text-red-600">Smart Shopping Starts Here:&nbsp;</span>
            <span><Image src="/assets/icons/arrow-right.svg" width={16} height={16} alt=""></Image></span>
          </div>
          <h1 className="text-6xl font-semibold flex flex-col gap-2">
            <span>Unleash the Power of</span>
            <span className="text-red-600">PriceWave</span>
          </h1>
          <p className="text-lg">Track product prices effortlessly and save money on your online shopping</p>
          <SearchBar/>
          <p className="text-sm italic ">Only Amazon links are supported yet</p>
        </div>

        <div className="hidden lg:flex h-full lg:min-h-[500px] min-h-[400px] lg:w-5/12 w-10/12 items-center justify-center bg-gray-100 rounded-3xl ">
          <HeroCarousel/> 
        </div>
        
      </div>


      

      <div className="w-5/6 mx-auto mt-10 lg:mt-0">
          <h2 className="text-[#282828] text-4xl font-semibold">Trending:</h2>

        <section className="grid lg:grid-cols-4 gap-5 mt-5 grid-cols-1 sm:grid-cols-2">
            {allProducts?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>
      </div>
      
      <RecentlyViewed/>

    


      {/* <div className="h-screen"></div> */}

    </>
  );
}
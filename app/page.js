import { getAllProducts } from "@/lib/actions";
import RecentlyViewed from "@/components/RecentlyViewed";
import Trending from "@/components/Trending";
import Hero from "@/components/Hero";

export default async function Home() {
  const allProducts = await getAllProducts();

  const localProducts= allProducts.map((product) => {
    const localProduct= {
      _id: product._id.toString(), 
      title: product.title,
      image: product.image,
      currency: product.currency,
      currentPrice: product.currentPrice,
    };
    return localProduct;
  });
  const carouselProducts=localProducts.slice(0, 6);

  
  return (
    <>
      <Hero carouselProducts={carouselProducts} />
      <Trending products={localProducts}/>
      <RecentlyViewed/>

    </>
  );
}
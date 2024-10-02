"use server"
import axios from 'axios';
import * as cheerio from 'cheerio';


export async function scrapeMyntraProduct(url) {
  if (!url) return;
  
  try {
    // Set up the request headers to mimic a browser
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
    };

    // Fetch the product page
    const response = await axios.get(url, { headers });
    
    const $ = cheerio.load(response.data);
    
    // Extract the product title
    const title = $('.pdp-title').first().text().trim();
    console.log(title)
    return;
    // if(!title) throw new Error('Product not found');

    // Extract current price using utility functions
    const currentPrice =  $('.pdp-price').first().text().trim().replace(/[^\d.]/g, '');
    const mrp= $('.pdp-discount-container .pdp-mrp').first().text().trim().replace(/[^\d.]/g, '');

    const divStyle = $('.image-grid-image').first().attr('style');
    const urlMatch = divStyle.match(/url\(&quot;(.+?)&quot;\)/);
    const image = urlMatch ? urlMatch[1] : null;


    let reviewsCount= $('.index-ratingsCount').first().text().trim();
    
    const stars= $('.index-overallRating .div').first().text().trim();
    const outOfStock = false;
    
    

    const data = {
      urlId: response.request.res.responseUrl,
      url: response.request.res.responseUrl,
      title,
      image,
      currency:'₹',
      mrp: Number(mrp) || Number(currentPrice),
      currentPrice: Number(currentPrice) || Number(mrp),

      isOutOfStock: outOfStock,
      reviewsCount: Number(reviewsCount), 
      stars: Number(stars),
         
      highestPrice: Number(currentPrice) || Number(mrp),
      lowestPrice: Number(currentPrice) || Number(mrp),
      averagePrice: Number(currentPrice) || Number(mrp),   
      priceHistory:[{price: Number(currentPrice) || Number(mrp)}],  
    };

    
    return data;
  } catch (error) {
    console.error('Error scraping product:', error.message);
  }
}

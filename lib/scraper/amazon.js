"use server"
import axios from 'axios';
import * as cheerio from 'cheerio';


export async function scrapeAmazonProduct(url) {
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
    const title = $('#productTitle').first().text().trim();
    if(!title) throw new Error('Product not found');

    // Extract current price using utility functions
    const currentPrice = extractAmazonPrice(
      $('.a-section .priceToPay.a-price span.a-price-whole').first(),
      $('.apexPriceToPay span.a-offscreen').first(),
      $('.a.size.base.a-color-price').first(),
      $('.a-button-selected .a-color-base').first(),
    );
    

    const mrp = extractAmazonPrice(
      $('.a-color-secondary .a-price.a-text-price span.a-offscreen').first(),
    );

    let reviewsCount= $('#averageCustomerReviews #acrCustomerReviewText').first().text().trim();
    if(reviewsCount) reviewsCount=reviewsCount.match(/(?:\d+,)*\d+/g)[0].replace(/,/g, '') ;
    
    let stars= $('#acrPopover .a-declarative .a-popover-trigger span').first().text().trim();
    if(stars) stars= stars.match(/\d+(\.\d+)?/)[0];
    
    // Check if the product is out of stock
    const outOfStock = $('#availability span').first().text().trim().toLowerCase().includes('currently unavailable');

    // Extract images
    const images =
    $('#landingImage').attr('data-a-dynamic-image') ||
    $('#imgBlkFront').attr('data-a-dynamic-image') ||
    '{}';
    
    const imageUrls = Object.keys(JSON.parse(images));
    
    
    const currency = $('.a-price-symbol').first().text().trim().slice(0, 1);

    // Construct data object with scraped information
    const parsedURL = new URL(response.request.res.responseUrl);
    let urlId= parsedURL.hostname + parsedURL.pathname.match(/\/dp\/[A-Z0-9]+/);

    const data = {
      urlId,
      url: response.request.res.responseUrl,
      title,
      image: imageUrls[0],
      currency: currency || '₹',
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




// Extracts and returns the price from a list of possible elements.
function extractAmazonPrice(...elements) {

  for (const element of elements) {
    const priceText = element.text().trim();
    if(priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice; 

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      } 

      return firstPrice || cleanPrice;
    }
  }

  return '';
}
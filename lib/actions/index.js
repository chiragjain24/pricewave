"use server"

import { scrapeAmazonProduct } from '@/lib/scraper';
import { connectToDB } from '../mongoose';
import Product from '../models/product.model';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function scrapeAndCheckProduct(productUrl) {
    let redirectPath='';
    let parsedURL = new URL(productUrl);
    const amazonUrls = ['amazon','amzn'];
    try{
        if( amazonUrls.includes(parsedURL.hostname.replace(/^www\./, '').replace(/\.[a-z]{2,}$/, '') )) {
            connectToDB();
            const scrapedProduct = await scrapeAmazonProduct(productUrl);
            // console.log(scrapedProduct);

            let product=scrapedProduct;  // we will update this if it exists in the database

            const existingProduct = await Product.findOne({urlId: scrapedProduct.urlId});

            if(existingProduct) {
              const updatedPriceHistory= [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
              ];
              
              product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
                users: existingProduct.users,
              }
            }

        
            const newProduct = await Product.findOneAndUpdate(
              { urlId: scrapedProduct.urlId },
              product,
              { upsert: true, new: true }
            );

            // console.log(newProduct)
            revalidatePath(`/products/${newProduct._id}`);
            // console.log(newProduct._id)
            redirectPath=`/products/${newProduct._id}`;
            return "hi"
        }
        

        // if(productUrl== 'www.flipkart.com'){
        // }

        throw new Error('Invalid URL');
            
    }
    catch (error) {
        console.error(error);
        redirectPath='';
        throw new Error('Failed to scrape the product');
    }
    finally{
      if(redirectPath) redirect(redirectPath);
    }

}

export async function getProductById(productId) {
  try {
    await connectToDB();

    const product = await Product.findOne({ _id: productId });
    if(!product) return null;
    return product;
  } catch (error) {
    console.log(error);
  }
}


export async function getAllProducts() {
  try {
    await connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(productId, userEmail) {
  try {
    await connectToDB();
    const product = await Product.findById(productId);

    if(!product) return;

    const userExists = product.users.some((user) => user.email === userEmail);

    if(!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      // const emailContent = await generateEmailBody(product, "WELCOME");

      // await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}


function getHighestPrice(priceList) {
    let highestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price > highestPrice.price) {
        highestPrice = priceList[i];
      }
    }
  
    return highestPrice.price;
  }
  
function getLowestPrice(priceList) {
    let lowestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price < lowestPrice.price) {
        lowestPrice = priceList[i];
      }
    }
  
    return lowestPrice.price;
  }
  
function getAveragePrice(priceList) {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;
  
    return averagePrice;
  }



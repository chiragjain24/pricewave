"use server"

import { scrapeAmazonProduct } from '@/lib/scraper/amazon';
import { connectToDB } from '../mongoose';
import Product from '../models/product.model';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import User from '@/lib/models/user.model';
import mongoose from 'mongoose';
import { scrapeMyntraProduct } from '../scraper/myntra';
import { generateEmailBody, sendEmail } from '../nodemailer';

export async function scrapeAndCheckMyntra(productUrl){
    try{
      const data=await scrapeMyntraProduct(productUrl);
      console.log(data);
    }catch(error){
      console.log(error);
    }
}
export async function scrapeAndCheckProduct(productUrl,cron=false) {
    console.log(new Date(),'scrapeAndCheckProduct started');
    let redirectPath='';
    let parsedURL = new URL(productUrl);
    const amazonUrls = ['amazon','amzn'];
    try{
      if( amazonUrls.includes(parsedURL.hostname.replace(/^www\./, '').replace(/\.[a-z]{2,}$/, '') )) {
        connectToDB();
        console.log(new Date(),'scrapeAndCheckProduct started 1');
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        console.log(new Date(),'scrapeAndCheckProduct started 2');
        // console.log(scrapedProduct);
        if(cron && scrapedProduct.currentPrice==0) throw new Error('Price is 0');
        
        let product=scrapedProduct;  // we will update this if it exists in the database
        
        const existingProduct = await Product.findOne({urlId: scrapedProduct.urlId});
        
        if(existingProduct) {
          if(scrapedProduct.currentPrice===0 && existingProduct.currentPrice!==0) throw new Error('Price is 0');

          if(cron && scrapedProduct.currentPrice < existingProduct.lowestPrice){
              const emailContent = await generateEmailBody(existingProduct, "LOWEST_PRICE");
              const userEmails = existingProduct.users.map(user => user.email);
              await sendEmail(emailContent, userEmails);
          }

          const updatedPriceHistory= updatePriceHistory(existingProduct.priceHistory, scrapedProduct.currentPrice);
          
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

            revalidatePath(`/products/${newProduct._id}`);
            // console.log(newProduct._id)
            redirectPath=`/products/${newProduct._id}`;
            return 'hi';
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
      console.log(new Date(),'scrapeAndCheckProduct ended');
      if(redirectPath && !cron) redirect(redirectPath);
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
    // const products = await Product.find({ 'currentPrice': { $gt: 0 } }).limit(8);
    const products = await Product.find({});

    return products;
  } catch (error) {
    console.log(error);
  }
}
export async function getAllProductsId() {
  try {
    await connectToDB();
    const products = await Product.find().select('_id').limit(800);
    const productIds= products.map(product => ({id: product._id.toString()}));
    return productIds;

  } catch (error) {
    console.log(error);
  }
}
export async function getAllProductsUrls() {
  try {
    await connectToDB();
    const products = await Product.find().select('url').limit(800);
    const productUrls= products.map(product => product.url);
    return productUrls;
  } catch (error) {
    console.log(error);
  }
}
export async function addProductToUser(userEmail, productId) {
  try {
    await connectToDB();
    const user = await User.findOne({ email: userEmail });
    const productExists = user.products.includes(productId);
    if (!productExists) {
      user.products.push(new mongoose.Types.ObjectId(productId));
      addUserEmailToProduct(productId, userEmail);
      await user.save();
    }

  } catch (error) {
    console.log(error);
  }
}
export async function deleteProductFromUser(userEmail, productId) {
  try {
    await connectToDB();
    const user = await User.findOne({ email: userEmail });

    const productIndex = user.products.findIndex((id) => id.toString() === productId);
    if (productIndex !== -1) {
      user.products.splice(productIndex, 1);
      removeUserEmailFromProduct(productId, userEmail);
      await user.save();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSavedProducts(userEmail){
  try {
    await connectToDB();
    const user = await User.findOne({ email: userEmail });
    return user.products.map(productId => productId.toString());
  } catch (error) {
    console.log(error);
  }
}
export async function getSavedProductsDetails(userEmail){
  try {
    await connectToDB();
    const user = await User.findOne({ email: userEmail });
    const products = await Product.find({
      _id: { $in: user.products }
    });
    const localProducts= products.map(product => {
      return {
        title:product.title,
        currentPrice:product.currentPrice,
        image:product.image,
        _id:product._id.toString(),
      }
    });
    return localProducts;

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

      const emailContent = await generateEmailBody(product, "WELCOME");
      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function removeUserEmailFromProduct(productId, userEmail) {
  try {
    await connectToDB();
    const product = await Product.findById(productId);
    if(!product) return;

    const userIndex = product.users.findIndex((user) => user.email === userEmail);
    if(userIndex !== -1) {
      product.users.splice(userIndex, 1);
      await product.save();
    }
  } catch (error) {
    console.log(error);
  }
}

function updatePriceHistory(priceHistory, currentPrice) {
  if(!currentPrice) return priceHistory;

    // Helper function to get date in IST without time
    function getDateWithoutTime(date) {
      // Create date string in IST
      const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      // Reset time to midnight
      istDate.setHours(0, 0, 0, 0);
      return istDate;
    }
    
  
    const today = getDateWithoutTime(new Date());
    const lastPrice = priceHistory[priceHistory.length - 1];
    const lastPriceDate = lastPrice ? getDateWithoutTime(new Date(lastPrice.date)) : null;
  
    if (lastPriceDate && lastPriceDate.getTime() === today.getTime()) {
      priceHistory[priceHistory.length - 1] = {
        price: currentPrice,
        date: new Date(),
      };
    } else {
      priceHistory.push({
        price: currentPrice,
        date: new Date(),
      });
    }


    return priceHistory;
}


function getHighestPrice(priceList) {
    if(!priceList.length) return 0;
    let highestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price > highestPrice.price) {
        highestPrice = priceList[i];
      }
    }
  
    return highestPrice.price;
  }
  
function getLowestPrice(priceList) {
    if(!priceList.length) return 0;
    let lowestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price < lowestPrice.price) {
        lowestPrice = priceList[i];
      } 
    }
  
    return lowestPrice.price;
  }
  
function getAveragePrice(priceList) {
    if(!priceList.length) return 0;
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;
  
    return averagePrice;
  }



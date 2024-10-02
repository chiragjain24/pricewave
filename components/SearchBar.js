"use client"
import React, { useState } from 'react'
import {scrapeAndCheckMyntra, scrapeAndCheckProduct} from '../lib/actions'
import { redirect } from 'next/navigation'

const isValidProductURL = (url) => {
  try{
    if(url.includes('https://') || url.includes('http://'))  {
      url = url.match(/(https?:\/\/[^\s]+)/g)[0];
    }
    else{
      url= `https://${url}`;
    }

    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
  
    if( hostname.includes ('amazon.') 
      || hostname.includes ('amzn.')
      // || hostname.includes ('myntra.') 

    ) { 
      return url;
    }

    else{
      return '';
    }
  } catch (error) {
      return '';
    }
  
}

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resLink = isValidProductURL(searchPrompt);

        if(!resLink) return alert('Please provide a valid Link')
    
            try {
                setIsLoading(true);
                setIsDisabled(true);
                // Scrape the product page
                await scrapeAndCheckProduct(resLink);

              } catch (error) {
                console.error('Error searching product:');
              } finally {
                setIsLoading(false);
                setIsDisabled(false);
              }
    }

    const handleChange = (e) => {
        setSearchPrompt(e.target.value)
        setIsDisabled(!e.target.value)
    }


    return (
        <>
            <form className="flex gap-3 mt-4 flex-col lg:flex-row" onSubmit={handleSubmit}>
                <input
                    value={searchPrompt}
                    onChange={handleChange}
                    className='w-full px-4 h-[50px] rounded-lg border-gray-200 border-2'
                    type="text"
                    placeholder="Enter a product link"
                />
                <button
                    type='submit'
                    className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-500  "
                    disabled={isDisabled}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </>
    )
}

export default SearchBar

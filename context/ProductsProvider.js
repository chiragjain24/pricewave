"use client"
import React, { useEffect, useState } from 'react';
import { productsContext } from './context';
import { useSession} from "next-auth/react"
import { getSavedProducts } from '@/lib/actions';

const ProductsProvider = ({ children }) => {
    const [savedProducts, setSavedProducts] = useState({})
    const { data: session } = useSession()
    
    const updateData = async () => {
        const data= await getSavedProducts(session.user.email);
        const obj = data.reduce((acc, id) => {
            acc[id] = true;
            return acc;
          }, {});
        setSavedProducts(obj);
    }
    
    useEffect(() => {
        if(session){
            updateData();
        }
    }, [session])
    

    return (
        <productsContext.Provider value={{ savedProducts, setSavedProducts }}>
            {children}
        </productsContext.Provider>
    );
};

export default ProductsProvider;

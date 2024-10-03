"use client"
import React, { useState } from 'react';
import { HeroAnimationContext } from './context';

const HeroAnimationProvider = ({ children }) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    
    return (
        <HeroAnimationContext.Provider value={{ hasAnimated, setHasAnimated }}>
            {children}
        </HeroAnimationContext.Provider>
    );
};

export default HeroAnimationProvider;

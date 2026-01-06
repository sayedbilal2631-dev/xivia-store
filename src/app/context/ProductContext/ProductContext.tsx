"use client"
import React, { createContext, useContext, useState } from "react"

interface productContext {
    loadProduct: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
}

const PorductContext = createContext<productContext | null>(null)

const ProductGlobalState = ({ children }: { children: React.ReactNode }) => {
    const [loadProduct, setLoadProduct] = useState<boolean>(false)
    const toggle = () => setLoadProduct((prev) => !prev);
    const setFalse = () => setLoadProduct(false);
    const setTrue = () => setLoadProduct(true);
    return (
        <PorductContext.Provider value={{ loadProduct, setTrue, setFalse, toggle }}>
            {children}
        </PorductContext.Provider>
    )
}

export const useBoolean = () => {
    const context = useContext(PorductContext);
    if (!context) {
        throw new Error('Some error occur in the product context')
    }
    return context;
}

export default ProductGlobalState
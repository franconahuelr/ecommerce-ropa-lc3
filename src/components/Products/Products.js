import React from 'react'
import { IndividualProduct } from './../IndividualProduct/IndividualProduct'

export const Products = ({products, onDelete, addToCart, userRole}) => {

    // console.log(products);
    
    return products.map((individualProduct)=>(
        <IndividualProduct 
        key = {individualProduct.ID} 
        individualProduct={individualProduct}
        onDelete={onDelete}
        addToCart={addToCart}
        role={userRole}
        />
    ))
}
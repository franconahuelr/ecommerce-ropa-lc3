import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'

export const IndividualCartProduct = ({cartProduct}) => {

    const { title, description, price, totalProductPrice, qty } = cartProduct;

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{title}</div>
            <div className='product-text description'>{description}</div>
            <div className='product-text price'>$ {price}</div>
            <span>Cantidad</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' >
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{qty}</div>               
                <div className='action-btns plus' >
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {totalProductPrice}</div>
            <div className='btn btn-danger btn-md cart-btn'>DELETE</div>            
        </div>
    )
}
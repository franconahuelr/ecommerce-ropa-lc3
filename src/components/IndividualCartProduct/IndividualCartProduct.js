import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { auth, fs } from '../../Firebase/Firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export const IndividualCartProduct = ({cartProduct, cartProductIncrease, cartProductDecrease}) => {

    const { title, description, price, qty, url } = cartProduct;

    const handleCartProductsIncrease = ()=>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductsDecrease =()=>{
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const cartDocRef = doc(fs, 'Cart ' + user.uid, cartProduct.ID);
          deleteDoc(cartDocRef)
            .then(() => {
              console.log('Successfully deleted');
            })
            .catch((error) => {
              console.error('Error deleting document:', error);
            });
        }
      });
    };

    const TotalProductPrice = price * qty;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={url} alt="product-img"/>
            </div>
            <div className='product-text title'>{title}</div>
            <div className='product-text description'>{description}</div>
            <div className='product-text price'>$ {price}</div>
            <span>Cantidad</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' onClick={handleCartProductsDecrease}>
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{qty}</div>               
                <div className='action-btns plus' onClick={handleCartProductsIncrease}>
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {TotalProductPrice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>Eliminar del Carrito</div>            
        </div>
    )
}
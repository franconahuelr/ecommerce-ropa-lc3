import React, {useState} from 'react';
import './IndividualProduct.css';

export const IndividualProduct = ({ individualProduct, onDelete, addToCart, role }) => {
  // Destructure the product properties
  const { url, title, description, price, ID } = individualProduct;

  const handleDeleteProduct = () => {
    // Call the onDelete function and pass the product ID or any other identifier
    onDelete(ID);
  };

  const handleAddToCart =()=>{
    addToCart(individualProduct);
    setSuccessMsg(true);
    setTimeout(()=>{
      setSuccessMsg(false);
      },2000)
  }

  const [successMsg, setSuccessMsg]=useState(false);

  return (
    <div className='product'>
      <div className='product-img'>
        <img src={url} alt="product-img" />
      </div>
      <div className='product-text title'>{title}</div>
      <div className='product-text description'>{description}</div>
      <div className='product-text price'>$ {price}</div>
      {role === 'admin' ? (
        <div className='btn btn-danger btn-md cart-btn' onClick={handleDeleteProduct}>
          Eliminar Producto
        </div>
      ) : (
        <div className='btn btn-primary btn-md cart-btn' onClick={handleAddToCart}>
          Añadir al Carrito
        </div>
      )}
        {successMsg&&<>
            <div className="success-msg">Añadido al Carrito</div>
        </>}
    </div>
  );
};





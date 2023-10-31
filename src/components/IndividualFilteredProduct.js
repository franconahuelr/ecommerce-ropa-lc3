import React from 'react';

export const IndividualFilteredProduct = ({ individualFilteredProduct, addToCart, onDelete, userRole }) => {
  const handleAddToCart = () => {
    addToCart(individualFilteredProduct);
  }

  const handleDeleteProduct = () => {
    onDelete(individualFilteredProduct.ID);
  }

  return (
    <div className='product'>
      <div className='product-img'>
        <img src={individualFilteredProduct.url} alt="product-img" />
      </div>
      <div className='product-text title'>{individualFilteredProduct.title}</div>
      <div className='product-text description'>{individualFilteredProduct.description}</div>
      <div className='product-text price'>$ {individualFilteredProduct.price}</div>
      {userRole === 'admin' ? (
        <div className='btn btn-danger btn-md cart-btn' onClick={handleDeleteProduct}>Eliminar Producto</div>
      ) : (
        <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>Agregar al Carrito</div>
      )}
    </div>
  );
}
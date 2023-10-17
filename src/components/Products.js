const Products = ({ products }) => {
  return (
    <div>
      <div>
        <img src={products.img} alt={products.title} />
        <div>
          <h3>
            {products.title} - ${products.price}
          </h3>
          <p>{products.description}</p>
        </div>
        {/* <a href="">AddToCart</a> */}
      </div>
    </div>
  );
};

export default Products;

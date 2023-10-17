import Products from "./Products";

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Productos</h2>
      <div>
        {products.length > 0 &&
          products.map((products) => (
            <div key={products.id}>
              <Products products={products} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;

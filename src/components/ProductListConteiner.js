import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductListConteiner = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const querryDb = db;
    const querryCollection = collection(querryDb, "products");
    if (("categoryId", "==", id)) {
      const querryFilter = query(querryCollection, where(id));
      getDocs(querryFilter).then((res) =>
        setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    } else {
      getDocs(querryCollection).then((res) =>
        setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    }
  }, [id]);

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductListConteiner;

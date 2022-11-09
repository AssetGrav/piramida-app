import React from "react";
import PropTypes from "prop-types";
import { useProduct } from "../hook/useProduct";
import Product from "./Product";
import { useAuth } from "../hook/useAuth";

function ProductList() {
  const { products } = useProduct();
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <ul className="divide-y divide-gray-200">
        {products.map((elem) => (
          <div key={elem._id}>
            <Product product={elem} userId={currentUser} />
          </div>
        ))}
      </ul>
    </div>
  );
}

ProductList.propTypes = {
  userId: PropTypes.string,
};

export default ProductList;

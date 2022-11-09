import React from "react";
import PropTypes from "prop-types";
import ProductList from "../components/ProductList";
import ProductProvider from "../hook/useProduct";

function Magazine() {
  return (
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  );
}

Magazine.propTypes = {
  userId: PropTypes.string,
};

export default Magazine;

import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import productList from "../api/products.js";
import bonusList from "../api/bonus";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState();
  const [bonus, setBonus] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getBonus();
  }, []);

  useEffect(() => {
    if (error !== null) {
      setError(null);
    }
  }, [error]);

  async function getProducts() {
    try {
      await productList.fetchAll().then((data) => setProducts(data));
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getBonus() {
    try {
      await bonusList.fetchAll().then((data) => setBonus(data));
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function buyProduct(product, data) {
    try {
      console.log("prod", product, data);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  function pushBonus(arr) {
    console.log("concat", bonus.concat(arr));
    setBonus(bonus.concat(arr));
    localStorage.setItem("bonus", JSON.stringify(bonus.concat(arr)));
  }

  return (
    <ProductContext.Provider
      value={{ products, error, buyProduct, bonus, pushBonus }}
    >
      {!isLoading ? children : "Loading..."}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProductProvider;

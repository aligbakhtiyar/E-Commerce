import React from "react";
import { Filters, ProductsContainer, PaginationContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

export const loader = async ({ request }) => {
  const response = await customFetch(url);
  const products = response.data.data;
  const meta = response.data.meta;

  console.log(response);
  return { products, meta };
};
const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;

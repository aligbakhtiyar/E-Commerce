import { useLoaderData } from "react-router-dom";
import { customFetch, generateAmountOptions, formatPrice } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

export const loader = async ({ params }) => {
  const response = await customFetch(`/products/${params.id}`);
  return { product: response.data.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const rupeeAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [numItem, setnumItem] = useState(1);

  const handleAmount = (e) => {
    setnumItem(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    productColor,
    company,
    numItem
  };

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* Product */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xlp-3">{rupeeAmount}</p>
          <p className="mt-3 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
            {/* Ammount */}
            <div className="form-control w-full max-w-xs"></div>
            <label className="label" htmlFor="amount">
              <h4 className="text-md-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className='select select-secondary select-bordered select-md'
              id='amount'
              value={numItem}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
            {/* Cart */}
            <div className="mt-10">
              <button className="btn btn-secondary btn-md" onClick={addToCart}>
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;

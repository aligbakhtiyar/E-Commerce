import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
//   const dollarsAmount =
//     new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format((price / 100).toFixed(2));

//   return dollarsAmount;

const rupeePrice = (price / 100)* 84
  const rupeeAmount =
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(rupeePrice.toFixed(0));

  return rupeeAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

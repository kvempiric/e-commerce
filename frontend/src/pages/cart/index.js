import Card from "@/components/Cards/Card";
import React from "react";
import { useSelector } from "react-redux";

function index() {
  const cartProduct = useSelector((state) => state.cart);
  console.log("cartProduct======>>>", cartProduct);
  return (
    <div>
      <div className="container mx-auto">
        {cartProduct.length > 0 ? (
          <Card products={cartProduct} />
        ) : (
          <p className="text-center text-3xl mt-5">Cart not found, please add to cart!</p>
        )}
      </div>
    </div>
  );
}

export default index;

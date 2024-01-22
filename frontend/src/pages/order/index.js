import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const index = () => {
  const [ordersInfo, setOrderInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productOrder, setProductOrder] = useState([]);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/order");
      // setOrderInfo(response.data.result);

      const products = await Promise.all(
        response.data?.result.map(async (item) => {
          const productId = item.products[0].productId;
          console.log("productId", productId);
          const res = await axios.get(
            `http://localhost:8000/product/${productId}`
          );
          return res.data.result;
        })
      );
      setProductOrder(products);
      setIsLoading(false);
    } catch (error) {
      console.log("error===========>>>", error);
    }
  };

  const handleCancelOrder = () => {
    console.log("Cancle Order");
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-3">
          {!isLoading && productOrder.map((item, index) => {
              return (
                <>
                  <div
                    className="w-full mr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <img
                      className="p-8 rounded-t-lg"
                      src={`http://localhost:8000${item.mainImage}`}
                      alt="product image"
                    />
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {item.name}
                        </h5>
                      </a>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ₹ {item.price}
                        </span>
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => handleCancelOrder()}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        {isLoading && <p className="text-2xl text-center mt-4">Loading...</p>}
        {!isLoading && productOrder.length === 0 && (
          <p className="text-2xl text-center mt-4">
            Order not found, please order now
          </p>
        )}
      </div>
    </>
  );
};

export default index;

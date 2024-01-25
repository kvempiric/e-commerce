import AlertMessage from "@/components/Alert/AlertMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const index = () => {
  const [ordersInfo, setOrderInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productOrder, setProductOrder] = useState([]);
  const [Alertpop, setAlertpop] = useState({
    show: false,
    type: "",
    message: "",
  });
  const fetchOrderData = async () => {
    try {
      const orderResponse = await axios.get("http://localhost:8000/order");
      const orderData = orderResponse.data?.result;

      const products = await Promise.all(
        orderData?.map(async (orderItem) => {
          const productId = orderItem.products[0].productId;
          const productResponse = await axios.get(
            `http://localhost:8000/product/${productId}`
          );
          const products = productResponse.data.result;
          const orderItemWithProduct = { ...orderItem, products };
          return orderItemWithProduct;
        })
      );

      setProductOrder(products);
      setIsLoading(false);
    } catch (error) {
      console.log("error===========>>>", error);
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/order/${id}`, {
        orderStatus: "canceled",
      });
      setAlertpop({
        show: true,
        type: "success",
        message: "order canceled successfully",
      });
      setTimeout(() => {
        setAlertpop({
          show: false,
        });
      }, 2000);
      
    } catch (error) {
      console.log("error===========>>>", error);
    }
  };
  console.log("productOrder", productOrder);
  useEffect(() => {
    fetchOrderData();
  }, [Alertpop]);

  return (
    <>
      <div className="container mx-auto">
        {Alertpop.show ? <AlertMessage Alertpop={Alertpop} /> : ""}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-3">
          {!isLoading &&
            productOrder.map((item, index) => {
              console.log("item.orderStatus",item.orderStatus);
              return (
                <>
                  <div
                    className="w-full mr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <img
                      className="p-8 rounded-t-lg"
                      src={`http://localhost:8000${item.products.mainImage}`}
                      alt="product image"
                    />
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {item.products.name}
                        </h5>
                      </a>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ₹ {item.products.price}
                        </span>
                        {item.orderStatus !== "canceled" ? (
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => handleCancelOrder(item._id)}
                        >
                          Cancel
                        </button>
                        ) : <p className="text-xl text-[red]">canceled</p>}
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

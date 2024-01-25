import axios from "axios";
import React, { useEffect, useState } from "react";
import AlertMessage from "../Alert/AlertMessage";
import Card from "../Cards/Card";
import EditProductModal from "../EditProductModal/EditProductModal";

function Subnavbar() {
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState({});

  const [Alertpop, setAlertpop] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [authUser, setAuthUser] = useState({
    userId: "",
    role: "",
  });

  const fetchData = async () => {
    const uId = localStorage.getItem("e-commerce_userId");
    const userRole = localStorage.getItem("role");
    setAuthUser({
      userId: uId,
      role: userRole,
    });
    try {
      if (userRole === "user") {
        const response = await fetch("http://localhost:8000/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.result);
        setFilterData(data.result);
        setIsLoading(false);
      } else {
        const response = await fetch("http://localhost:8000/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filterData = data.result.filter((item) => item.sellerRef === uId);
        setProducts(filterData);
        setFilterData(filterData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (e) => {
    if (e.target.value === "all") {
      setFilterData(products);
    } else {
      const productFilterData = products.filter(
        (item) => item.category === e.target.value
      );
      setFilterData(productFilterData);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/product/${id}`
      );
      setAlertpop({
        show: true,
        type: "success",
        message: response.data.message,
      });
      fetchData();
      setTimeout(() => {
        setAlertpop({
          show: false,
        });
      }, 2000);
    } catch (error) {
      alert(error);
    }
  };
  const handleEditProduct = (data) => {
    setEditProductData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {Alertpop.show ? <AlertMessage Alertpop={Alertpop} /> : ""}
      <div className="container mx-auto py-5 border-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-0 justify-center">
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"all"}
            onClick={(e) => handleClick(e)}
          >
            All
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"phone"}
            onClick={(e) => handleClick(e)}
          >
            Phone
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"electronics"}
            onClick={(e) => handleClick(e)}
          >
            Electronics
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"watches"}
            onClick={(e) => handleClick(e)}
          >
            Watches
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"sports"}
            onClick={(e) => handleClick(e)}
          >
            Sports
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"cloths"}
            onClick={(e) => handleClick(e)}
          >
            Cloths
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"footwear"}
            onClick={(e) => handleClick(e)}
          >
            Footwear
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"jewellery"}
            onClick={(e) => handleClick(e)}
          >
            Jewellery
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        {!isLoading && (
          <Card
            products={filterData}
            authUser={authUser}
            deleteProduct={handleDeleteProduct}
            EditProduct={handleEditProduct}
          />
        )}
      </div>
      <EditProductModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        productData={editProductData}
      />
    </>
  );
}

export default Subnavbar;

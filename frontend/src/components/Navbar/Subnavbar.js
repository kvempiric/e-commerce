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
  const [categoryName, setCategoryName] = useState();

  const categoryList = [
    "All",
    "Phones",
    "Electronics",
    "Sports",
    "Jewellery",
    "Watches",
    "Clothes",
    "Footwear",
  ];

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

  const handleSelect = (cetegory) => {
    setCategoryName(cetegory);
    if (cetegory === "All") {
      setFilterData(products);
    } else {
      const productFilterData = products.filter(
        (item) => item.category === cetegory
      );
      console.log("products", productFilterData);
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

  const handleinputChange = (e) => {
    setIsLoading(true);
    const searchData = products.filter((obj) =>
      obj.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilterData(searchData);
    setIsLoading(false);
  };

  return (
    <>
      {Alertpop.show ? <AlertMessage Alertpop={Alertpop} /> : ""}
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="self-center">
            <input
              type="text"
              className="px-5 py-3 w-full border border-1 border-black rounded-full"
              placeholder="search products here"
              onChange={(e) => handleinputChange(e)}
            />
          </div>
          <div className="justify-self-end">
            <label
              for="qty"
              className="block mb-2 me-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Filter Categories
            </label>
            <select
              id="qty"
              className="bg-gray-50 border w-full lg:w-60 border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={(e) => {
                handleSelect(e.target.value);
              }}
              value={categoryName}
            >
              {categoryList.map((value) => (
                <option key={value} value={value} className="text-md">
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        {!isLoading && (
          <Card
            products={filterData}
            authUser={authUser}
            deleteProduct={handleDeleteProduct}
            EditProduct={handleEditProduct}
            Loading={isLoading}
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

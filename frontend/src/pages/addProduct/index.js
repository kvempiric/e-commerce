import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AlertMessage from "@/components/Alert/AlertMessage";

function index() {
  const router = useRouter();
  const [Alertpop, setAlertpop] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    mainImage: null,
    images: [],
    availableQty: "",
    rating: "",
    sellerRef: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      // Handle multiple image files
      const imageFiles = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.from(files),
      }));
    } else if (name === "mainImage") {
      // Handle single image files
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      // Handle other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("e-commerce_userId");
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("mainImage", formData.mainImage);
    const imagesArray = Object.values(formData.images);
    imagesArray.forEach((image, index) => {
      form.append(`images`, image);
    });
    form.append("availableQty", formData.availableQty);
    form.append("rating", formData.rating);
    form.append("sellerRef", (formData.sellerRef = userId));

    try {
      const response = await axios.post("http://localhost:8000/product", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      setAlertpop({
        show: true,
        type: "success",
        message: response.data.message,
      });
      setFormData({});
      setTimeout(() => {
        setAlertpop({
          show: false,
        });
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {Alertpop.show ? <AlertMessage Alertpop={Alertpop} /> : ""}
      <div className="container w-full lg:w-1/2 mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <label
            className="block mb-2 text-lg font-bold text-gray-800"
            htmlFor="name"
          >
            Product Name:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label
            className="block mb-2 text-lg font-bold text-gray-800"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label
            className="block mb-2 text-lg font-bold text-gray-800"
            htmlFor="category"
          >
            Category:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <label
            className="block mb-2 text-lg font-bold text-gray-800"
            htmlFor="availableQty"
          >
            Quantity:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="availableQty"
            name="availableQty"
            value={formData.availableQty}
            onChange={handleChange}
            required
          />

          <label
            className="block mb-2 text-lg font-bold text-gray-800"
            htmlFor="rating"
          >
            Rating:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />

          <label
            className="block mb-2 text-lg font-bold text-gray-800"
            htmlFor="mainImage"
          >
            Main Image:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="file"
            id="mainImage"
            name="mainImage"
            onChange={handleChange}
            required
          />

          <label
            className="block mb-2 text-lg font-bold text-gray-800"
            htmlFor="images"
          >
            Images:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="file"
            id="images"
            name="images"
            onChange={handleChange}
            multiple
            required
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default index;

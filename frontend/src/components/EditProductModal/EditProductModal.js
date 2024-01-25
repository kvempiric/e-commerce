import AlertMessage from "../Alert/AlertMessage";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const EditProductModal = (props) => {
  const { isModalOpen, handleCloseModal, productData } = props;
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [multipleImages, setMultipleImages] = useState("");
  const [Alertpop, setAlertpop] = useState({
    show: false,
    type: "",
    message: "",
  });
  const categotyList = [
    "electronics",
    "watches",
    "sports",
    "cloths",
    "footwear",
    "jewellery",
    "phone",
  ];

  useEffect(() => {
    setFile(productData.mainImage);
    setMultipleImages(productData.images);
    formik.resetForm({
      values: {
        name: productData.name || "",
        price: productData.price || "",
        category: productData.category || "",
        availableQty: productData.availableQty || "",
        rating: productData.rating || "",
        mainImage: productData.mainImage || "",
        images: productData.images || "",
      },
    });
  }, [productData]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.string().required("Category is required"),
    availableQty: Yup.number().required("Qty is required"),
    rating: Yup.number().required("Rating is required"),
    mainImage: Yup.string().required("Main Image is required"),
    images: Yup.string().required("Images is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      availableQty: "",
      rating: "",
      mainImage: "",
      images: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("value", values);
      // Add your submission logic here
    },
  });

  return (
    <>
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-slate-200 rounded-lg shadow">
              <div className="flex items-center justify-between p-4 rounded-t">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Edit Product
                </h3>
              </div>
              <form className="p-4" onSubmit={formik.handleSubmit}>
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={` bg-gray-50 border text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}

                <label
                  htmlFor="name"
                  className="block my-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className={`${
                    formik.touched.price && formik.errors.price
                      ? "border-red-500"
                      : ""
                  } bg-gray-50 border text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-500">{formik.errors.price}</div>
                ) : null}

                <label
                  htmlFor="category"
                  className="block my-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  {categotyList.map((value) => (
                    <option key={value} value={value} className="text-md">
                      {value}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-red-500">{formik.errors.category}</div>
                ) : null}
                <label
                  htmlFor="availableQty"
                  className="block my-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Quentity
                </label>
                <input
                  type="text"
                  name="availableQty"
                  id="availableQty"
                  className={`${
                    formik.touched.availableQty && formik.errors.availableQty
                      ? "border-red-500"
                      : ""
                  } bg-gray-50 border text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.availableQty}
                />
                {formik.touched.availableQty && formik.errors.availableQty ? (
                  <div className="text-red-500">
                    {formik.errors.availableQty}
                  </div>
                ) : null}
                <label
                  htmlFor="rating"
                  className="block my-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Rating
                </label>
                <input
                  type="text"
                  name="rating"
                  id="rating"
                  className={`${
                    formik.touched.rating && formik.errors.rating
                      ? "border-red-500"
                      : ""
                  } bg-gray-50 border text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.rating}
                  disabled
                />
                {formik.touched.rating && formik.errors.rating ? (
                  <div className="text-red-500">{formik.errors.rating}</div>
                ) : null}
                <button
                  type="button"
                  className="px-3 py-3 my-3 font-medium rounded-lg bg-slate-400 hover:text-white hover:bg-slate-500"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef?.current?.click();
                    }
                  }}
                >
                  Select main image
                </button>
                <input
                  type="file"
                  id="mainImage"
                  name="mainImage"
                  ref={fileInputRef}
                  onChange={(e) => {
                    formik.setFieldValue("mainImage", e.target.files[0]);
                    setImageAsFile((imageFile) => e.target.files[0]);
                    setFile(URL.createObjectURL(e.target.files[0]));
                  }}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                {file ? (
                  <div className="h-44 w-44">
                    <img
                      src={`http://localhost:8000${file}`}
                      alt="preview of seleted image"
                      style={{ borderRadius: "10px", objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  ""
                )}
                <button
                  type="button"
                  className="px-3 py-3 my-3 font-medium rounded-lg bg-slate-400 hover:text-white hover:bg-slate-500"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                >
                  Select multi images
                </button>
                <input
                  type="file"
                  id="mainImage"
                  name="mainImage"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const selectedFiles = e.target.files;
                    console.log("selectedFiles", selectedFiles);
                    formik.setFieldValue("mainImage", selectedFiles);
                    for (const file in selectedFiles) {
                      console.log("file", file);
                    }
                    // selectedFiles?.map((file) => {
                    //     setMultipleImages((imageFile) => selectedFiles[0]);
                    // })
                    // // display only the first selected image
                    // if (selectedFiles.length > 0) {
                    //     setFile(URL.createObjectURL(selectedFiles[0]));
                    // }
                  }}
                  accept="image/*"
                  style={{ display: "none" }}
                  multiple
                />
                {multipleImages ? (
                  <div className="h-44 w-44">
                    <img
                      src={`http://localhost:8000${file}`}
                      alt="preview of selected image"
                      style={{ borderRadius: "10px", objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  ""
                )}

                <button
                  type="submit"
                  className="mt-4 mr-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-1.5 text-center"
                >
                  Submit
                </button>
                <button
                  className="rounded-lg px-3 py-1 text-lg text-gray-600 hover:text-white bg-gray-400 hover:bg-gray-500"
                  onClick={() => {
                    handleCloseModal();
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductModal;

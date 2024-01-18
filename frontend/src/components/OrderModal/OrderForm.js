import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function OrderForm(props) {
  const { productDetails } = props;
  const [quantity, setQuantity] = useState(1);
  const QtyOptions = Array.from({ length: 10 }, (_, index) => index + 1);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.number().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    payment: Yup.string().required("Category is required"),
  });
  console.log("productDetails", productDetails);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      payment: "cash on delivery",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Your form submission logic goes here
      console.log(values);
    },
  });

  return (
    <>
      {/* Main modal */}
      {props.isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="relative bg-slate-200 rounded-lg shadow">
              <div className="flex items-center justify-between p-4 rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h3>
                <button
                  type="button"
                  className="rounded-lg px-3 py-1 text-lg text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-500"
                  onClick={() => props.handleCloseModal()}
                >
                  Close
                </button>
              </div>
              {/* Modal body */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center h-40 border border-gray-200 rounded-lg md:flex-row">
                  <img
                    class="object-contain rounded-t-lg h-36 w-40 md:rounded-none md:rounded-s-lg"
                    src={`http://localhost:8000${productDetails.mainImage}`}
                    alt=""
                  />
                  <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {productDetails.name}
                    </h5>
                    <div>
                      <p class="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
                        Price : ₹ {productDetails.price}
                      </p>
                      <p class="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
                        Total Amount : ₹ {productDetails.price * quantity}
                      </p>
                    </div>
                    <div class="col-span-2 sm:col-span-1 flex items-center">
                      <label
                        for="qty"
                        class="block mb-2 me-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Qty
                      </label>
                      <select
                        id="qty"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-20 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                        value={quantity}
                      >
                        {QtyOptions.map((value) => (
                          <option key={value} value={value} className="text-md">
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <form className="p-4" onSubmit={formik.handleSubmit}>
                <label
                  for="name"
                  class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}

                <label
                  for="phone"
                  className="block my-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500">{formik.errors.phone}</div>
                ) : null}

                <label
                  for="address"
                  class="block my-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your current address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-500">{formik.errors.address}</div>
                ) : null}

                <label
                  for="payment"
                  class="block my-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Payment mode
                </label>
                <select
                  id="payment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                >
                  <option selected="cash on delivery">Cash On Delivery</option>
                  <option value="online">Online</option>
                </select>
                <button
                  type="submit"
                  className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-1.5 text-center"
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderForm;

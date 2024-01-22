import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AlertMessage from "@/components/Alert/AlertMessage";
import { useRouter } from "next/router";
import axios from "axios";

function signin() {
  const router = useRouter();
  const [Alertpop, setAlertpop] = useState({
    show: false,
    type: "",
    message: "",
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/signin",
          values
        );
          console.log("response", response);
        if (!response.data.isSuccess) {
          console.log("response not getting");
        }
        setAlertpop({
          show: true,
          type: "success",
          message: response.data.massage,
        });
        localStorage.setItem("e-commerce_userId", response.data.result._id);
        formik.resetForm();
        setTimeout(() => {
          setAlertpop({
            show: false,
          });
          router.push("/");
          router.reload();
        }, 2000);
      } catch (error) {
        console.error("API error:", error);
      }
    },
  });
  return (
    <div>
      {Alertpop.show ? <AlertMessage Alertpop={Alertpop} /> : ""}
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default signin;

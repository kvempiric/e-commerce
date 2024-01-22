import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const router = useRouter();
  const item = useSelector((state) => state.cart);
  const [isUserLogin, setIsUserLogin] = useState("");

  useEffect(() => {
    setIsUserLogin(localStorage.getItem("e-commerce_userId"));
  }, [isUserLogin]);

  return (
    <div className="container-fluid bg-green-500">
      <div className="container mx-auto py-5 flex justify-between">
        <div>
          <Link href={"/"} className="text-2xl">
            E-commerce
          </Link>
        </div>
        <div className="">
          <button
            onClick={() =>
              isUserLogin
                ? router.push("/addProduct")
                : alert("please first signup or login...")
            }
            className="p-4 text-xl"
          >
            Add Product
          </button>
          <Link href={"/order"} className="p-4 text-xl">
            Order
          </Link>
          <Link href={"/cart"} className="p-4 text-xl">
            Mycart{item.length > 0 ? `(${item.length})` : ""}
          </Link>
          <Link href={"/about"} className="p-4 text-xl">
            About
          </Link>
          <Link href={"/contact"} className="p-4 text-xl">
            contact us
          </Link>
          {!isUserLogin ? (
            <>
              <Link href={"/auth/signup"} className="p-4 text-xl">
                SignUp
              </Link>
              <Link href={"/auth/signin"} className="p-4 text-xl">
                SignIn
              </Link>
            </>
          ) : (
            <button
              href={"/"}
              className="p-4 text-xl"
              onClick={() => {
                localStorage.removeItem("e-commerce_userId"), router.reload();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import Link from "next/link";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [isUserLogin, setIsUserLogin] = useState("");
  useEffect(() => {
    setIsUserLogin(localStorage.getItem("e-commerce_userId"));
  }, []);
  console.log("userId", isUserLogin);

  return (
    <div className="container-fluid bg-green-500">
      <div className="container mx-auto py-5 flex justify-between">
        <div>
          <Link href={"/"} className="text-2xl">
            E-commerce
          </Link>
        </div>
        <div className="">
          <Link href={"/cart"} className="p-4 text-xl">
            Mycart
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
            <Link
              href={"/"}
              className="p-4 text-xl"
              onClick={localStorage.removeItem("e-commerce_userId")}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

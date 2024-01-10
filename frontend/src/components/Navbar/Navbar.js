import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="container-fluid bg-green-500">
      <div className="container mx-auto py-5 flex justify-between">
        <div>
          <p className=" text-2xl">E-commerce</p>
        </div>
        <div className="">
          <Link href={"/"} className="p-4 text-xl">
            Orders
          </Link>
          <Link href={"/"} className="p-4 text-xl">
            Mycart
          </Link>
          <Link href={"/"} className="p-4 text-xl">
            About
          </Link>
          <Link href={"/"} className="p-4 text-xl">
            contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

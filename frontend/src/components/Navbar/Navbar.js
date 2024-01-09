import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="container-fluid bg-slate-500">
      <div class="container mx-auto py-5 flex justify-between">
        <div>
          <p className=" text-2xl text-white">E-commerce</p>
        </div>
        <div className="">
          <Link href={"/"} className="p-4 text-white text-xl">
            Orders
          </Link>
          <Link href={"/"} className="p-4 text-white text-xl">
            Mycart
          </Link>
          <Link href={"/"} className="p-4 text-white text-xl">
            About
          </Link>
          <Link href={"/"} className="p-4 text-white text-xl">
            contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

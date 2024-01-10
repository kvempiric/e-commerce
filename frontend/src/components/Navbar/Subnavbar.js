import React from "react";

function Subnavbar() {
  return (
    <>
      <div className="container mx-auto py-5 border-2 ">
        <div className="flex justify-center">
          <button className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl">
            All
          </button>
          <button className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl">
            Electronics
          </button>
          <button className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl">
            watches
          </button>
          <button className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl">
            cloths
          </button>
          <button className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl">
            footwear
          </button>
          <button className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl">
            jewellery
          </button>
        </div>
      </div>
    </>
  );
}

export default Subnavbar;

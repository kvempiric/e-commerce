import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";

function Subnavbar() {
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/product");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.result);
      setFilterData(data.result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (e) => {
    if (e.target.value === "all") {
      setFilterData(products);
    } else {
      const productFilterData = products.filter(
        (item) => item.category === e.target.value
      );
      setFilterData(productFilterData);
    }
  };

  return (
    <>
      <div className="container mx-auto py-5 border-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-0 justify-center">
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"all"}
            onClick={(e) => handleClick(e)}
          >
            All
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"phone"}
            onClick={(e) => handleClick(e)}
          >
            Phone
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"electronics"}
            onClick={(e) => handleClick(e)}
          >
            Electronics
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"watches"}
            onClick={(e) => handleClick(e)}
          >
            Watches
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"sports"}
            onClick={(e) => handleClick(e)}
          >
            Sports
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"cloths"}
            onClick={(e) => handleClick(e)}
          >
            Cloths
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"footwear"}
            onClick={(e) => handleClick(e)}
          >
            Footwear
          </button>
          <button
            className="mx-auto bg-slate-700 text-white px-6 py-3 rounded-3xl mb-4 md:mb-4"
            value={"jewellery"}
            onClick={(e) => handleClick(e)}
          >
            Jewellery
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        {!isLoading && <Card products={filterData} />}
      </div>
    </>
  );
}

export default Subnavbar;

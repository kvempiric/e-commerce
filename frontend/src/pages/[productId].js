import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function productId() {
  const router = useRouter();
  const { productId } = router.query;
  const [productDetails, setProductDetails] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/product/${productId}`
    );
    setProductDetails(response.data.result);
  };

  useEffect(() => {
    if (productId) {
      fetchData(productId);
    }
  }, [productId]);

  return (
    <div>
      <div className="container-fluid p-10">
        <div className="grid grid-cols-2">
          <Carousel axis="vertical" showThumbs={false}>
            {productDetails.images &&
              productDetails.images.map((item, index) => {
                return (
                  <>
                    <img
                      src={`http://localhost:8000${item}`}
                      className=""
                      key={index}
                    />
                  </>
                );
              })}
          </Carousel>
          <div className="px-10">
            <p className="text-5xl mb-5">{productDetails.name}</p>
            <p>
              {productDetails.availableQty > 0 ? (
                <strong className="text-green-700">available</strong>
              ) : (
                <strong className="text-red-700">not available</strong>
              )}
            </p>
            <p className="text-4xl mb-3">₹{productDetails.price}</p>
            <p className="text-bold">Category : {productDetails.category}</p>
            <p className="text-bold">Rating : {productDetails.rating} star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default productId;

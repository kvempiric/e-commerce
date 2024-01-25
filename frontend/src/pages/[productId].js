import axios from "axios";
import { useRouter } from "next/router";
import { Rating, ThinStar } from "@smastrom/react-rating";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import OrderForm from "@/components/OrderModal/OrderForm";

function productId() {
  const router = useRouter();
  const { productId } = router.query;
  const [productDetails, setProductDetails] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const myRatingStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/product/${productId}`
    );
    setProductDetails(response.data.result);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (productId) {
      fetchData(productId);
    }
  }, [productId]);

  return (
    <>
      <OrderForm
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        productDetails={productDetails}
      />
      <div className="container-fluid p-10">
        <div className="grid grid-cols-2">
          <Carousel
            axis="vertical"
            showThumbs={false}
            centerMode={true}
            style={{ height: "400px" }}
          >
            {productDetails.images &&
              productDetails.images.map((item, index) => {
                return (
                  <>
                    <div className="h-1/2">
                      <img
                        src={`http://localhost:8000${item}`}
                        className=""
                        key={index}
                      />
                    </div>
                  </>
                );
              })}
          </Carousel>
          <div className="px-10">
            <p className="text-5xl mb-2">{productDetails.name}</p>
            <Rating
              style={{ maxWidth: 120 }}
              value={productDetails.rating}
              readOnly={true}
              halfFillMode={true}
              itemStyles={myRatingStyles}
            />
            <p className="my-3">
              {productDetails.availableQty > 0 ? (
                <strong className="text-green-700">available</strong>
              ) : (
                <strong className="text-red-700">not available</strong>
              )}
            </p>
            <p className="text-4xl mb-3">₹{productDetails.price}</p>
            <p className="text-bold">Category : {productDetails.category}</p>

            <button
              className="text-white bg-[#fb641b] hover:bg-blue-800 mt-5 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => handleOpenModal()}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default productId;

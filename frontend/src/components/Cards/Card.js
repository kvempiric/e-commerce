import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add, remove } from "@/redux/features/CartSlice";
import Link from "next/link";
import { useRouter } from "next/router";

function Card(props) {
  const { products } = props;
  const [productData, setProductData] = useState(products);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(add(item));
  };
  const handleRemoveToCart = (id) => {
    dispatch(remove(id));
  };
  const handleinputChange = (e) => {
    setProductData("");
    setLoading(true);
    const searchData = products.filter((obj) =>
      obj.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setProductData(searchData);
    setLoading(false);
  };

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <>
      <div className="my-6 w-full lg:w-1/2 mx-auto">
        <input
          type="text"
          className="px-5 py-3 border border-1 border-black w-full rounded-full"
          placeholder="search products here"
          onChange={(e) => handleinputChange(e)}
        />
      </div>
      {Loading && (
        <div role="status" className="text-center">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {!Loading &&
          productData.map((item, index) => {
            return (
              <>
                <div
                  className="w-full mr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <Link href={`${item._id}`}>
                    <img
                      className="p-8 rounded-t-lg"
                      src={`http://localhost:8000${item.mainImage}`}
                      alt="product image"
                    />
                  </Link>
                  <div className="px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                      </h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {item.price}
                      </span>
                      {router.asPath == "/" ? (
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to cart
                        </button>
                      ) : (
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => handleRemoveToCart(item._id)}
                        >
                          Remove to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      {!Loading && productData.length == 0 && (
        <p className="text-2xl text-center">Product not found</p>
      )}
    </>
  );
}

export default Card;

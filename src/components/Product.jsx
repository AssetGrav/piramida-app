import React, { useState } from "react";
import PropTypes from "prop-types";
import BuyForm from "./ui/BuyForm";

function Product({ product, userId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <li className="py-4 flex">
      <img className="h-10 w-10 rounded-full" src={product.image} alt="" />
      <div className="flex-1">
        <div className="px-4 flex-row">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between  flex-row items-center">
        <p className="text-base font-medium text-gray-900 flex justify-center m-5">
          {product.price + " тенге"}
        </p>
        <button
          className=" w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          {"buy "}
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">{product.name}</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="flex flex-row">
                    <img className="h-40 w-40" src={product.image} alt="" />
                    <div className="relative p-6 flex w-40 h-56">
                      <BuyForm product={product} userId={userId} />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </li>
  );
}

Product.propTypes = {
  product: PropTypes.object,
  userId: PropTypes.object,
};

export default Product;

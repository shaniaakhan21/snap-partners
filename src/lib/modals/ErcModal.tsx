// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";

type Props = {};

const ErcModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full ">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded w-36 cursor-pointer"
        onClick={openModal}
      >
        Open Modal
      </button>
      {isOpen && (
        <div className="flex justify-center items-center fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-500">
                      Modal Title
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your modal content can go here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-red-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse cursor-pointer">
                <div
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErcModal;

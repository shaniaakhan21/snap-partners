// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";

type Props = {
  closemodal: () => void;
};

const ErcModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full flex justify-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-36 h-12 cursor-pointer"
        onClick={openModal}
      >
        Open Modal
      </button>
      {isOpen && (
        <div className="bg-white w-[866px] h-[762px] rounded-lg ">
          {/* header  */}
          <div>
            <div className="flex justify-between items-center px-2.5 pt-5 font-open-sans ">
              <div className="font-semibold font-lg">Company Name Detail</div>
              <div
                className="cursor-pointer text-2xl w-8 h-8"
                onClick={closeModal}
              >
                x
              </div>
            </div>
            <div className="flex space-x-5 px-2.5 py-5 items-center">
              <div className="text-sm">Signup Date: MM/DD/YYYY</div>
              <div className="text-xs">example@email.com</div>
              <div className="text-xs">+1 555 5555 5555</div>
            </div>
          </div>
          {/* body  */}
          <div className="flex space-x-5 justify-center">
            {/* phase 1  */}
            <div className="bg-phase-100 w-64 px-2.5 py-3 rounded-lg">
              <div className="flex justify-between items-center">
                <div>Phase 1 Progress</div>
                <div className="text-xs font-bold">2/2</div>
              </div>
              <div className="flex space-x-2 pt-2.5">
                <div className="bg-textAcent-500 h-2 w-32 rounded-lg"></div>
                <div className="bg-textAcent-500 h-2 w-32 rounded-lg"></div>
              </div>
            </div>
            {/* phase 2  */}
            <div className="bg-phase-200 w-64 px-2.5 py-3 rounded-lg">
              <div className="flex justify-between items-center">
                <div>Phase 2 Progress</div>
                <div className="text-xs font-bold">3/6</div>
              </div>
              <div className="flex space-x-2 pt-2.5">
                <div className="bg-textAcent-100 h-2 w-32 rounded-lg"></div>
                <div className="bg-textAcent-100 h-2 w-32 rounded-lg"></div>
                <div className="bg-textAcent-100 h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
              </div>
            </div>
            {/* phase 3  */}
            <div className="bg-phase-300 w-64 px-2.5 py-3 rounded-lg">
              <div className="flex justify-between items-center">
                <div>Phase 3 Progress</div>
                <div className="text-xs font-bold">0/6</div>
              </div>
              <div className="flex space-x-2 pt-2.5">
                <div className="bg-textAcent-200 h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
                <div className="bg-white h-2 w-32 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErcModal;

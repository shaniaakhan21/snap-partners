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
    <div className="w-full flex justify-center font-sans">
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
            <div>
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
              <div className="py-3 px-2.5">
                <div className="flex justify-between text-lg font-semibold">
                  <div>Your Payment</div>
                  <div>200$</div>
                </div>
                <div className="flex justify-between text-xs">
                  <div>10% of CV</div>
                  <div>DD//MM//YYYY</div>
                </div>
              </div>
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="236"
                  height="2"
                  viewBox="0 0 256 2"
                  fill="none"
                >
                  <path d="M0 1H255.333" stroke="#DADADA" />
                </svg>
              </div>
              <div className="py-3 px-2.5">
                <div>Next Step</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.90892 12C6.72492 12 6.54892 11.924 6.42292 11.79L3.18092 8.33737C2.92825 8.06937 2.94225 7.64737 3.21025 7.39537C3.47892 7.14337 3.90092 7.1567 4.15225 7.4247L6.90225 10.352L12.5076 4.21737C12.7569 3.9447 13.1783 3.9267 13.4503 4.1747C13.7216 4.4227 13.7403 4.8447 13.4923 5.11603L7.40092 11.7827C7.27625 11.92 7.09892 11.9987 6.91359 12H6.90892Z"
                  fill="red"
                />
              </svg>
            </div>

            {/* phase 2  */}
            <div>
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
              <div className="py-3 px-2.5">
                <div className="flex justify-between text-lg font-semibold">
                  <div>Your Payment</div>
                  <div>200$</div>
                </div>
                <div className="flex justify-between text-xs">
                  <div>10% of CV</div>
                  <div>DD//MM//YYYY</div>
                </div>
              </div>
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="236"
                  height="2"
                  viewBox="0 0 256 2"
                  fill="none"
                >
                  <path d="M0 1H255.333" stroke="#DADADA" />
                </svg>
              </div>
              <div className="py-3 px-2.5">
                <div>Next Step</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.90892 12C6.72492 12 6.54892 11.924 6.42292 11.79L3.18092 8.33737C2.92825 8.06937 2.94225 7.64737 3.21025 7.39537C3.47892 7.14337 3.90092 7.1567 4.15225 7.4247L6.90225 10.352L12.5076 4.21737C12.7569 3.9447 13.1783 3.9267 13.4503 4.1747C13.7216 4.4227 13.7403 4.8447 13.4923 5.11603L7.40092 11.7827C7.27625 11.92 7.09892 11.9987 6.91359 12H6.90892Z"
                  fill="red"
                />
              </svg>
            </div>

            {/* phase 3  */}
            <div>
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
              <div className="py-3 px-2.5">
                <div className="flex justify-between text-lg font-semibold">
                  <div>Your Payment</div>
                  <div>200$</div>
                </div>
                <div className="flex justify-between text-xs">
                  <div>10% of CV</div>
                  <div>DD//MM//YYYY</div>
                </div>
              </div>
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="236"
                  height="2"
                  viewBox="0 0 256 2"
                  fill="none"
                >
                  <path d="M0 1H255.333" stroke="#DADADA" />
                </svg>
              </div>
              <div className="py-3 px-2.5">
                <div>Next Step</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.90892 12C6.72492 12 6.54892 11.924 6.42292 11.79L3.18092 8.33737C2.92825 8.06937 2.94225 7.64737 3.21025 7.39537C3.47892 7.14337 3.90092 7.1567 4.15225 7.4247L6.90225 10.352L12.5076 4.21737C12.7569 3.9447 13.1783 3.9267 13.4503 4.1747C13.7216 4.4227 13.7403 4.8447 13.4923 5.11603L7.40092 11.7827C7.27625 11.92 7.09892 11.9987 6.91359 12H6.90892Z"
                  fill="red"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErcModal;

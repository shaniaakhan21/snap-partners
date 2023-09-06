// eslint-disable-next-line no-use-before-define
import dayjs from 'dayjs'
import { Client } from 'lib/types/transaction'
import React, { useState } from 'react'

type ErcModalProps = {
  client: Client
  isOpen: boolean;
  onClose: () => void;
};

const Step = ({ number, title, filled, filledColor, color }) => {
  return (
    <div className='flex flex-row items-center'>
      <div className={`${filled ? `bg-${filledColor}` : `border-1 border-${color} border-textAccent-500`} w-8 h-8 rounded-full flex justify-center items-center`}>
        {
          filled
            ? (
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
                  fill="white"
                />
              </svg>
            )
            : (
              <span>
                {number}
              </span>
            )
        }
      </div>
      <span className={`text-${filled ? filledColor : color}`}>
        {title}
      </span>
    </div>
  )
}

const ErcModal: React.FC<ErcModalProps> = ({ isOpen, client, onClose }) => {
  if (!client) return null
  let phase1Progress = 0
  if (client.depositPaid) phase1Progress++
  if (client.aggrementSigned) phase1Progress++
  return (
    <div>
      {isOpen && (
        <div className="absolute top-0 left-0 justify-center pl-44 flex  font-sans z-50 items-center h-screen w-screen bg-slate-800 bg-opacity-20 ">
          <div className="bg-white w-[866px] h-[762px] rounded-lg max-h-[90vh] ">
            {/* header  */}
            <div>
              <div className="flex justify-between items-center px-2.5 pt-5 font-open-sans ">
                <div className="font-semibold font-lg">Company Name Detail</div>
                <div
                  className="cursor-pointer text-2xl w-8 h-8"
                  onClick={() => onClose()}
                >
                  x
                </div>
              </div>
              <div className="flex space-x-5 px-2.5 py-5 items-center">
                <div className="text-sm">Signup Date: {dayjs(client.signupDate).format('MM/DD/YYYY')}</div>
                <div className="text-xs">{client.email}</div>
                <div className="text-xs">{client.phone}</div>
              </div>
            </div>
            {/* body  */}
            <div className="flex space-x-5 justify-center">
              {/* phase 1  */}
              <div>
                <div className="bg-phase-100 w-64 px-2.5 py-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>Phase 1 Progress</div>
                    <div className="text-xs font-bold">{phase1Progress}/2</div>
                  </div>
                  <div className="flex space-x-2 pt-2.5">
                    <div className={`${phase1Progress > 0 ? 'bg-textAcent-500' : 'bg-white'} h-2 w-32 rounded-lg`} />
                    <div className={`${phase1Progress > 1 ? 'bg-textAcent-500' : 'bg-white'} h-2 w-32 rounded-lg`} />
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
                <Step number={2} title='Deposit Pay' filled={client.depositPaid} filledColor={'textAccent-500'} color={'textAccent-500'}/>
                <Step number={1} title='Aggreement Signed' filled={client.aggrementSigned} filledColor={'textAccent-500'} color={'textAccent-500'}/>
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
        </div>
      )}
    </div>
  )
}

export default ErcModal

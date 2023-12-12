// eslint-disable-next-line no-use-before-define
import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SetcClient } from 'lib/types/setc'
dayjs.extend(customParseFormat) // Extend dayjs with the plugin. Required for Safari

type SetcModalProps = {
  client: SetcClient
  isOpen: boolean;
  onClose: () => void;
};

const SeparatorLine = () => (
  <div className="flex justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="280"
      height="2"
      viewBox="0 0 280 2"
      fill="none"
    >
      <path d="M0 1H280" stroke="#DADADA" />
    </svg>
  </div>
)

interface StepProps {
  number: number;
  title: string;
  date?: string,
  filled: 'half' | 'full' | 'empty';
  fillColor: string;
  halfFillColor?: string
  color: string;
  clickable?: boolean;
  onClick?: () => void
}

const Step = (props: StepProps) => {
  const { number, title, date = undefined, filled, fillColor, halfFillColor, color } = props

  return (
    <div className='flex flex-row items-center justify-between mb-4 ml-2'>
      <div className='flex flex-row items-center'>
        <div className={`w-8 h-8 rounded-full flex justify-center items-center ${filled === 'full' ? `bg-${fillColor}` : filled === 'half' ? `bg-${halfFillColor}` : `border border-${color}`}`}>
          {
            filled === 'full'
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
                <div>
                  <span>
                    {number}
                  </span>
                </div>
              )
          }
        </div>
        <span className={`text-${filled === 'full' ? fillColor : color} mx-2`}>
          {title}
        </span>
      </div>
      <span>{date}</span>
    </div>
  )
}

const SetcModal: React.FC<SetcModalProps> = ({ isOpen, client, onClose }) => {
  if (!client) return null
  const { email, phone, orderDate, agreementSignedDate, taxpayerQualified2020, taxpayerQualified2021, caregiverQualified2020, caregiverQualified2021, childCareQualified2020, childCareQualified2021, irsFiledDate, paidAmount, isPersonalClient } = client
  const status = paidAmount < 0 ? 'inactive' : 'active'
  const filedWithIRS = irsFiledDate && irsFiledDate !== 'N/A'
  //   const initialPayment = 200
  const familyQualified2020 = childCareQualified2020 || caregiverQualified2020
  const familyQualified2021 = childCareQualified2021 || caregiverQualified2021

  const phase1StepCount = 2
  const phase2StepCount = 5
  const phase3StepCount = 1
  // phase 1
  let phase1Progress = 0
  if (orderDate) phase1Progress++
  if (agreementSignedDate) phase1Progress++

  // phase 2
  let phase2Progress = 0
  if (client.paidDate) phase2Progress = phase2StepCount

  // if any step is done in phase 2, fill all phase1 steps
  if (phase2Progress > 0) phase1Progress = phase1StepCount

  // phase 3
  // eslint-disable-next-line prefer-const
  let phase3Progress = 0
  if (filedWithIRS) phase3Progress++

  const totalCV = (client.paidAmount || 0) / 2
  const commission = isPersonalClient ? 0 : totalCV * 0.4

  return (
    <div>
      {isOpen && (
        <div className="absolute top-0 left-0 justify-center pl-44 flex  font-sans z-50 items-center h-screen w-screen bg-slate-800 bg-opacity-20 overflow-scroll">
          <div className="bg-white w-[960px] h-[762px] rounded-lg max-h-[90vh] ">
            {/* header  */}
            <div>
              <div className="flex justify-between items-center px-2.5 pt-5 font-open-sans ">
                <p className="font-semibold text-lg">{client.name}</p>
                {
                  isPersonalClient && (
                    <span>
                      <p className='text-sm text-warning-900'>PERSONAL SETC CLIENT RULE APPLIES ON THIS ACCOUNT</p>
                      <p className='text-xs'>If the IBO signs themselves up for SETC, the volume credit is given to the IBO while the PCV commission is given to the sponsor</p>
                    </span>

                  )
                }
                <div
                  className="cursor-pointer text-2xl w-8 h-8"
                  onClick={() => onClose()}
                >
                  x
                </div>
              </div>
              <div className="flex px-2.5 py-5 justify-between items-center">
                <div className='flex items-center space-x-5'>
                  <p className="text-sm">Signup Date: {dayjs(orderDate, 'MM-DD-YYYY').format('MM/DD/YYYY')}</p>
                  <p className="text-xs text-textAcent-500">{email}</p>
                  <p className="text-xs text-textAcent-500">{phone}</p>
                </div>
                <div>
                  <span className='text-black text-xs'>
                    Account Status:
                  </span>
                  <span className={`text-xs ${status === 'active' ? 'text-success-600' : 'text-textAcent-500'} font-bold`}>
                    {status === 'active' ? ' Active' : ' Refunded/Cancelled'}
                  </span>
                </div>
              </div>
            </div>
            {/* body  */}
            <div className="flex space-x-2 justify-center">
              {/* phase 1  */}
              <div>
                <div className="bg-phase-100 w-72 px-2.5 py-3 rounded-lg ml-2">
                  <div className="flex justify-between items-center pl-2">
                    <div>Phase 1 Progress</div>
                    <div className="text-xs font-bold">{phase1Progress}/{phase1StepCount}</div>
                  </div>
                  <div className="flex space-x-2 pt-2.5">
                    {
                      Array(phase1StepCount).fill(null).map((_, idx) => (
                        <div key={`phase1-progress-${idx}`} className={`${phase1Progress > idx ? 'bg-textAcent-500' : 'bg-white'} h-2 w-32 rounded-lg`} />
                      ))
                    }
                  </div>
                </div>
                <div className='mt-[68px]'>
                  <SeparatorLine />
                </div>
                <div className="py-3 px-2.5">
                  Next Step
                </div>
                <Step
                  number={2}
                  title='Signed Agreement'
                  date={agreementSignedDate ? dayjs(agreementSignedDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                  filled={(!!agreementSignedDate || phase1Progress === phase1StepCount) ? 'full' : 'empty'}
                  fillColor={'textAcent-500'}
                  color={'textAcent-500'}/>
                <Step
                  number={1}
                  title='Submission Date'
                  date={orderDate ? dayjs(orderDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                  filled={(!!orderDate || phase1Progress === phase1StepCount) ? 'full' : 'empty'}
                  fillColor={'textAcent-500'}
                  color={'textAcent-500'}/>
              </div>

              {/* phase 2  */}
              <div>
                <div className="bg-phase-200 w-72 px-2.5 py-3 rounded-lg ml-2">
                  <div className="flex justify-between items-center pl-2">
                    <div>Phase 2 Progress</div>
                    <div className="text-xs font-bold">{phase2Progress}/{phase2StepCount}</div>
                  </div>
                  <div className="flex space-x-2 pt-2.5">
                    {
                      Array(phase2StepCount).fill(null).map((_, idx) => (
                        <div key={`phase2-progress-${idx}`} className={`${phase2Progress > idx ? 'bg-textAcent-100' : 'bg-white'} h-2 w-32 rounded-lg`} />
                      ))
                    }
                  </div>
                </div>
                <div className='py-3 px-2.5'>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>
                        Commission
                    </span>
                    <span>
                      { status !== 'active' ? 'N/A' : client.paidAmount ? `$${commission}` : 'TBD'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                        Total CV
                    </span>
                    <span>
                      {status !== 'active' ? 'N/A' : client.paidAmount ? `$${totalCV}` : 'TBD'}
                    </span>
                  </div>
                  <div className='mt-2'>
                    <SeparatorLine />
                  </div>
                  <div className="py-3 px-2.5">
                    Next Step
                  </div>
                  <Step
                    number={5}
                    title='Invoice Paid'
                    date={client.paidDate ? dayjs(client.paidDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                    filled={client.paidDate ? 'full' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={4}
                    title='Taxpayer Qualified 2020'
                    date={client.paidDate ? taxpayerQualified2020 ? ' Yes' : 'No' : 'TBD'}
                    filled={client.paidDate ? taxpayerQualified2020 ? 'full' : 'empty' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={3}
                    title='Taxpayer Qualified 2021'
                    date={client.paidDate ? taxpayerQualified2021 ? ' Yes' : 'No' : 'TBD'}
                    filled={client.paidDate ? taxpayerQualified2021 ? 'full' : 'empty' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={2}
                    title='Family Qualified 2020'
                    date={client.paidDate ? familyQualified2020 ? 'Yes' : 'No' : 'TBD'}
                    filled={client.paidDate ? familyQualified2020 ? 'full' : 'empty' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={1}
                    title='Family Qualified 2021'
                    date={client.paidDate ? familyQualified2021 ? 'Yes' : 'No' : 'TBD'}
                    filled={client.paidDate ? familyQualified2021 ? 'full' : 'empty' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                </div>
              </div>

              {/* phase 3  */}
              <div>
                <div className="bg-phase-300 w-72 px-2.5 py-3 rounded-lg mr-4">
                  <div className="flex justify-between items-center">
                    <div>Phase 3 Progress</div>
                    <div className="text-xs font-bold">{phase3Progress}/{phase3StepCount}</div>
                  </div>
                  <div className="flex space-x-2 pt-2.5">
                    {
                      Array(phase3StepCount).fill(null).map((_, idx) => (
                        <div key={`phase2-progress-${idx}`} className={`${phase3Progress > idx ? 'bg-textAcent-200' : 'bg-white'} h-2 w-32 rounded-lg`} />
                      ))
                    }
                  </div>
                </div>
                <div className='mt-[68px]'>
                  <SeparatorLine />
                </div>
                <div className="py-3 px-2.5">
                  Next Step
                </div>
                <Step
                  number={1}
                  title='Filed with IRS'
                  date={filedWithIRS ? dayjs(irsFiledDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                  filled={filedWithIRS ? 'full' : 'empty'}
                  fillColor={'textAcent-200'}
                  color={''} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SetcModal

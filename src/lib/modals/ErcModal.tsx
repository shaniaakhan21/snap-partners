// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Client } from 'lib/types/transaction'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { NumberUtils } from 'lib/utils/number'
dayjs.extend(customParseFormat) // Extend dayjs with the plugin. Required for Safari

type ErcModalProps = {
  client: Client
  isOpen: boolean;
  onClose: () => void;
};

const Step = ({ number, title, date = undefined, filled, filledColor, color, clickable = false, onClick = null }) => {
  return (
    <div
      onClick={clickable ? onClick : null}
      className='flex flex-row items-center justify-between mb-4 ml-2'
      style={{ cursor: clickable ? 'pointer' : 'default' }}>
      <div className='flex flex-row items-center'>
        <div className={`${filled ? `bg-${filledColor}` : `border border-${color}`} mr-2 w-8 h-8 rounded-full flex justify-center items-center`}>
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
        <span className={`text-${filled ? filledColor : color}`} style={{ textDecoration: clickable ? 'underline' : 'default' }}>
          {title}
        </span>
      </div>
      <span>{date}</span>
    </div>
  )
}

const ErcModal: React.FC<ErcModalProps> = ({ isOpen, client, onClose }) => {
  const [quartersVisible, setQuartersVisible] = useState(false)
  if (!client) return null
  const phase1StepCount = 2
  const phase2StepCount = 5
  const phase3StepCount = 8
  // phase 1
  let phase1Progress = 0
  if (client.depositPaid) phase1Progress++
  if (client.agreementSigned) phase1Progress++

  // phase 2
  let phase2Progress = 0
  if (client.docsCollected) phase2Progress++
  if (client.excelTeam) phase2Progress++
  if (client.docSentForSignature) phase2Progress++
  if (client.docForSignatureReturned) phase2Progress++
  const quartersWithAmount = client.quarters?.filter(quarter => quarter.amount !== '')
  const filedWithIRS = client.quarters?.length > 0 && quartersWithAmount.length > 0 && quartersWithAmount.every(quarterWithAmount => quarterWithAmount.amount !== '0' ? !!quarterWithAmount.dateFiled : true)
  if (filedWithIRS) phase2Progress++

  // if any step is done in phase 2, fill all phase1 steps
  if (phase2Progress > 0) phase1Progress = phase1StepCount

  // phase 3
  // eslint-disable-next-line prefer-const
  let phase3Progress = 0

  const totalCV = client.totalCV
  const PCV = totalCV * 0.4
  const phase2CV = PCV * 0.1
  const phase3CV = PCV * 0.9
  return (
    <div>
      {isOpen && (
        <div className="absolute top-0 left-0 justify-center pl-44 flex  font-sans z-50 items-center h-screen w-screen bg-slate-800 bg-opacity-20 overflow-scroll">
          <div className="bg-white w-[866px] h-[762px] rounded-lg max-h-[90vh] ">
            {/* header  */}
            <div>
              <div className="flex justify-between items-center px-2.5 pt-5 font-open-sans ">
                <div className="font-semibold font-lg">{client.companyName}</div>
                <div
                  className="cursor-pointer text-2xl w-8 h-8"
                  onClick={() => onClose()}
                >
                  x
                </div>
              </div>
              <div className="flex space-x-5 px-2.5 py-5 items-center">
                <div className="text-sm">Signup Date: {dayjs(client.signupDate, 'MM-DD-YYYY').format('MM/DD/YYYY')}</div>
                <div className="text-xs text-textAcent-500">{client.email}</div>
                <div className="text-xs text-textAcent-500">{client.phone}</div>
              </div>
            </div>
            {/* body  */}
            <div className="flex space-x-5 justify-center">
              {/* phase 1  */}
              <div>
                <div className="bg-phase-100 w-64 px-2.5 py-3 rounded-lg ml-2">
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
                <div className="py-3 px-2.5">
                  <div className="flex justify-between text-lg font-semibold">
                    <div>Initial Payment</div>
                    <div>$200</div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div>CV = $500</div>
                    <div>{phase1Progress === phase1StepCount ? dayjs(client.signupDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="2"
                    viewBox="0 0 256 2"
                    fill="none"
                  >
                    <path d="M0 1H255.333" stroke="#DADADA" />
                  </svg>
                </div>
                <div className="py-3 px-2.5">
                  Next Step
                </div>
                <Step number={2} title='Agreement Signed' filled={client.agreementSigned || phase1Progress === phase1StepCount} filledColor={'textAcent-500'} color={'textAcent-500'}/>
                <Step number={1} title='Deposit Pay' filled={client.depositPaid || phase1Progress === phase1StepCount} filledColor={'textAcent-500'} color={'textAcent-500'}/>
              </div>

              {/* phase 2  */}
              <div>
                <div className="bg-phase-200 w-64 px-2.5 py-3 rounded-lg ml-2">
                  <div className="flex justify-between items-center">
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
                <div className="py-3 px-2.5">
                  <div className="flex justify-between text-lg font-semibold">
                    <div className='flex flex-col'>
                      <span>Advance Payment</span>
                      <span className='text-xs font-normal italic'>
                        10% of PCV
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <div style={{ flex: 1 }}> {phase2Progress === phase2StepCount ? `$${NumberUtils.formatNumberWithCommas(phase2CV.toFixed(2))}` : ''}</div>
                      {/* <div className='text-xs font-normal'>MM/DD/YYYY</div> */}
                    </div>
                  </div>
                  <div className="flex justify-center mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="256"
                      height="2"
                      viewBox="0 0 256 2"
                      fill="none"
                    >
                      <path d="M0 1H255.333" stroke="#DADADA" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Your PCV for this account</span>
                    <span>${NumberUtils.formatNumberWithCommas(PCV.toFixed(2))}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span>Total CV for this account</span>
                    <span>${NumberUtils.formatNumberWithCommas(totalCV.toFixed(2))}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="2"
                    viewBox="0 0 256 2"
                    fill="none"
                  >
                    <path d="M0 1H255.333" stroke="#DADADA" />
                  </svg>
                </div>
                <div className="py-3 px-2.5">
                  Next Step
                </div>
                <Step
                  number={5}
                  title='Filed With IRS Date'
                  filled={filedWithIRS || phase2Progress === phase2StepCount}
                  filledColor={'textAcent-100'}
                  color={'textAcent-100'}
                  clickable={client.quarters.length > 0 && totalCV > 0}
                  onClick={() => setQuartersVisible(true)}/>
                <Step
                  number={4}
                  title='Doc for signature returned'
                  date={client.docForSignatureReturned ? dayjs(client.docForSignatureReturned, 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY') : ''}
                  filled={client.docForSignatureReturned || phase2Progress === phase2StepCount}
                  filledColor={'textAcent-100'}
                  color={'textAcent-100'}/>
                <Step
                  number={3}
                  title='Doc Sent for signature'
                  date={client.docSentForSignature ? dayjs(client.docSentForSignature, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                  filled={client.docSentForSignature || phase2Progress === phase2StepCount}
                  filledColor={'textAcent-100'}
                  color={'textAcent-100'}/>
                <Step
                  number={2}
                  title='Excel Team'
                  date={client.excelTeam ? dayjs(client.excelTeam, 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY') : ''}
                  filled={client.excelTeam || phase2Progress === phase2StepCount}
                  filledColor={'textAcent-100'}
                  color={'textAcent-100'}/>
                <Step
                  number={1}
                  title='Docs Collected'
                  date={client.docsCollected ? dayjs(client.docsCollected, 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY') : ''}
                  filled={client.docsCollected || phase2Progress === phase2StepCount}
                  filledColor={'textAcent-100'}
                  color={'textAcent-100'}/>
              </div>

              {/* phase 3  */}
              <div>
                <div className="bg-phase-300 w-64 px-2.5 py-3 rounded-lg mr-4">
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
                    {/* <div className="bg-white h-2 w-32 rounded-lg"></div>
                    <div className="bg-white h-2 w-32 rounded-lg"></div>
                    <div className="bg-white h-2 w-32 rounded-lg"></div>
                    <div className="bg-white h-2 w-32 rounded-lg"></div>
                    <div className="bg-white h-2 w-32 rounded-lg"></div>
                    <div className="bg-white h-2 w-32 rounded-lg"></div> */}
                  </div>
                </div>
                <div className="py-3 px-2.5">
                  <div className="flex justify-between text-lg font-semibold">
                    <div className='flex flex-col'>
                      <span>Final Payment</span>
                      <span className='text-xs font-normal italic'>
                        90% of PCV
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <div style={{ flex: 1 }}> {phase3Progress === phase3StepCount ? `$${NumberUtils.formatNumberWithCommas(phase3CV.toFixed(2))}` : ''}</div>
                      {/* <div className='text-xs font-normal'>MM/DD/YYYY</div> */}
                    </div>
                  </div>
                  <div className="flex justify-center mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="256"
                      height="2"
                      viewBox="0 0 256 2"
                      fill="none"
                    >
                      <path d="M0 1H255.333" stroke="#DADADA" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Your PCV for this account</span>
                    <span>${NumberUtils.formatNumberWithCommas(PCV.toFixed(2))}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span>Total CV for this account</span>
                    <span>${NumberUtils.formatNumberWithCommas(totalCV.toFixed(2))}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="2"
                    viewBox="0 0 256 2"
                    fill="none"
                  >
                    <path d="M0 1H255.333" stroke="#DADADA" />
                  </svg>
                </div>
                <div className="py-3 px-2.5">
                  <div>Coming Soon...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <QuarterModal quarters={client.quarters} isOpen={quartersVisible} onClose={() => setQuartersVisible(false)}/>
    </div>
  )
}

export default ErcModal

const QuarterModal = ({ quarters, isOpen, onClose }: {quarters: Client['quarters'], isOpen: boolean, onClose: () => void}) => {
  const mappedQuarters = quarters.map(q => ({ ...q, amount: q.amount ? 'Yes' : 'No', dateFiled: q.dateFiled ? dayjs(q.dateFiled, 'MM-DD-YYYY').format('MM/DD/YYYY') : 'Not yet available' })).reverse()

  const columns = [
    {
      name: 'year',
      header: 'Year',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'quarter',
      header: 'Quarter',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'amount',
      header: 'ERC Amount Determined',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'dateFiled',
      header: 'Filed Date',
      defaultFlex: 1,
      minWidth: 150
    }
  ]

  const gridStyle = {
    minHeight: 400
  }

  return (
    <div>
      {isOpen && (
        <div className="absolute top-0 left-0 justify-center pl-44 flex  font-sans z-50 items-center h-screen w-screen bg-opacity-20">
          <div className="bg-white w-[866px] h-[762px] rounded-lg max-h-[90vh] border border-black-500">
            {/* header  */}
            <div className="flex justify-between items-center px-2.5 pt-5 font-open-sans ">
              <div className="font-semibold font-lg">IRS filing progress by Quarter</div>
              <div
                className="cursor-pointer text-2xl w-8 h-8"
                onClick={() => onClose()}
              >
                  x
              </div>
            </div>
            <span className='px-2.5'>
              Note:  ERC amount will be known prior to date filed in the process.  Date filed triggers completion of this step.
            </span>
            {/* body */}
            <div className='px-2.5 mt-5'>
              <ReactDataGrid
                idProperty="id"
                columns={columns}
                dataSource={mappedQuarters}
                sortable={true}
                // defaultFilterValue={filterValue}
                style={gridStyle}
                defaultLimit={10}
                pagination={false}
              />
              {/* {quarters.map(renderQuarter)} */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
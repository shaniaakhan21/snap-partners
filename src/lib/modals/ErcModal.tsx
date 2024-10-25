// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Client, Payout } from 'lib/types/transaction'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { NumberUtils } from 'lib/utils/number'
dayjs.extend(customParseFormat) // Extend dayjs with the plugin. Required for Safari

type ErcModalProps = {
  client: Client
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
  const { number, title, date = undefined, filled, fillColor, halfFillColor, color, clickable = false, onClick = null } = props

  return (
    <div
      onClick={clickable ? onClick : null}
      className='flex flex-row items-center justify-between mb-4 ml-2'
      style={{ cursor: clickable ? 'pointer' : 'default' }}>
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
        <span className={`text-${filled === 'full' ? fillColor : color} mx-2`} style={{ textDecoration: clickable ? 'underline' : 'default' }}>
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
  const { totalCV, filedCV } = client
  const { payouts, remainingPayout, upfrontPayment } = client.payout || { payouts: [] as Payout[], remainingPayout: -1, upfrontPayment: -1 }
  const initialPayment = 200

  const phase1StepCount = 2
  const phase2StepCount = 5
  let phase3StepCount = 6
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
  const filedWithIRS = filedCV.toFixed(2) === totalCV.toFixed(2) && filedCV !== 0
  if (filedWithIRS) phase2Progress++

  // if any step is done in phase 2, fill all phase1 steps
  if (phase2Progress > 0) phase1Progress = phase1StepCount

  // phase 3
  // eslint-disable-next-line prefer-const
  let phase3Progress = 0

  const phase1AdvanceCV = 500

  const totalPCV = totalCV * 0.4
  const filedPCV = filedCV * 0.4
  const phase3TotalPCV = filedPCV
  const phase3FiledCV = Array.isArray(payouts) && payouts.length > 0 ? payouts.reduce((prev, curr) => prev + curr.amount, 0) + upfrontPayment + phase1AdvanceCV : 0
  const phase3FiledPCV = phase3FiledCV * 0.4
  const phase3TotalCV = filedCV
  const IrsFilingStartedNotFinished = filedCV > 0 && filedCV !== totalCV
  const phase2Payment = filedPCV * 0.1
  const phase3Payment = phase3FiledPCV * 0.9

  let filedWithIRSDate = ''
  if (filedWithIRS || phase2Progress === phase2StepCount) {
    filedWithIRSDate = client.quarters.find(q => !!q.dateFiled)?.dateFiled || ''
  }

  // calculate phase 3 progress
  if (payouts.length > 0) {
    // if remaining amount is phase 1 advance payment then everything is paid
    if (remainingPayout.toFixed(0) === phase1AdvanceCV.toString()) {
      phase3StepCount = payouts.length
    } else {
      phase3StepCount = payouts.length + 1
    }
  }
  phase3Progress = payouts.length

  const allPhasesAreDone = phase3Progress === phase3StepCount && phase3Progress > 0

  // check if client is created before December 1, 2023
  const isClientOld = dayjs(client.signupDate, 'MM-DD-YYYY').isBefore('12-01-2023')
  return (
    <div>
      {isOpen && (
        <div className="absolute top-0 left-0 justify-center pl-44 flex  font-sans z-50 items-center h-screen w-screen bg-slate-800 bg-opacity-20 overflow-scroll">
          <div className="bg-white w-[960px] h-[762px] rounded-lg max-h-[90vh] ">
            {/* header  */}
            <div>
              <div className="flex justify-between items-center px-2.5 pt-5 font-open-sans ">
                <p className="font-semibold font-lg">{client.companyName}</p>
                {
                  allPhasesAreDone && (
                    <p className='text-lg'>
                      <span className='font-bold'>Final Payment: </span>
                        ${NumberUtils.formatNumberWithCommas((phase2Payment + phase3Payment).toFixed(2))}
                    </p>
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
                  <p className="text-sm">Signup Date: {dayjs(client.signupDate, 'MM-DD-YYYY').format('MM/DD/YYYY')}</p>
                  <p className="text-xs text-textAcent-500">{client.email}</p>
                  <p className="text-xs text-textAcent-500">{client.phone}</p>
                </div>
                <div>
                  <span className='text-black text-xs'>
                    Account Status:
                  </span>
                  <span className={`text-xs ${client.status === 'active' ? 'text-success-600' : 'text-textAcent-500'} font-bold`}>
                    {allPhasesAreDone ? 'Completed' : client.status === 'active' ? ' Active' : ' Refunded/Cancelled'}
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
                <div className="py-3 px-2.5">
                  {
                    isClientOld && (
                      <div className="flex justify-between text-lg font-semibold">
                        <div>Initial Payment</div>
                        <div>${initialPayment}</div>
                      </div>

                    )
                  }
                  <div className='mt-5'>
                    {
                      isClientOld && (
                        <SeparatorLine />
                      )
                    }
                  </div>
                  <div className="flex justify-between text-xs mt-2">
                    {
                      isClientOld && (
                        <>
                          <div>CV = ${phase1AdvanceCV}</div>
                          <div>{phase1Progress === phase1StepCount ? dayjs(client.signupDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}</div>
                        </>
                      )
                    }
                  </div>
                </div>
                <div className={isClientOld ? 'mt-8' : 'mt-[86px]'}>
                  <SeparatorLine />
                </div>
                <div className="py-3 px-2.5">
                  Next Step
                </div>
                <Step number={isClientOld ? 2 : 1} title='Agreement Signed' filled={(client.agreementSigned || phase1Progress === phase1StepCount) ? 'full' : 'empty'} fillColor={'textAcent-500'} color={'textAcent-500'}/>
                {
                  isClientOld && (
                    <Step number={1} title='Deposit Pay' filled={(client.depositPaid || phase1Progress === phase1StepCount) ? 'full' : 'empty'} fillColor={'textAcent-500'} color={'textAcent-500'}/>
                  )
                }
              </div>

              {/* phase 2  */}
              <div>
                <div className="bg-phase-200 w-72 px-2.5 py-3 rounded-lg ml-2">
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
                      <div style={{ flex: 1 }}> {phase2Progress === phase2StepCount ? `$${NumberUtils.formatNumberWithCommas((phase2Payment).toFixed(2))}` : ''}</div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <SeparatorLine />
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-xs flex flex-row justify-between mt-2'>
                      <div className='flex-1' />
                      <span className='font-semibold flex-1 text-right'>Potential</span>
                      <span className='font-semibold flex-1 text-right'>Filed</span>
                    </div>
                    <div className='text-xs flex flex-row justify-between'>
                      <span className='font-semibold flex-1 text-left'>PCV</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(totalPCV.toFixed(2))}</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(filedPCV.toFixed(2))}</span>
                    </div>
                    <div className='text-xs flex flex-row justify-between'>
                      <span className='font-semibold flex-1 text-left'>Total CV</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(totalCV.toFixed(2))}</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(filedCV.toFixed(2))}</span>
                    </div>
                  </div>
                </div>
                <SeparatorLine />

                <div className="py-3 px-2.5">
                  Next Step
                </div>
                <Step
                  number={5}
                  title='Filed With IRS Date'
                  // date={filedWithIRSDate ? }
                  date={filedWithIRSDate ? dayjs(filedWithIRSDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                  filled={(filedWithIRS || phase2Progress === phase2StepCount) ? 'full' : IrsFilingStartedNotFinished ? 'half' : 'empty'}
                  fillColor={'textAcent-100'}
                  halfFillColor='phase-200'
                  color={'textAcent-100'}
                  clickable={client.quarters.length > 0 && totalCV > 0}
                  onClick={() => setQuartersVisible(true)}/>
                <Step
                  number={4}
                  title='Doc for signature returned'
                  date={client.docForSignatureReturned ? dayjs(client.docForSignatureReturned, 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY') : ''}
                  filled={(client.docForSignatureReturned || phase2Progress === phase2StepCount) ? 'full' : 'empty'}
                  fillColor={'textAcent-100'}
                  color={'textAcent-100'}/>
                <Step
                  number={3}
                  title='Doc Sent for signature'
                  date={client.docSentForSignature ? dayjs(client.docSentForSignature, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                  filled={(client.docSentForSignature || phase2Progress === phase2StepCount) ? 'full' : 'empty'}
                  fillColor={'textAcent-100'}
                  color={'textAcent-100'}/>
                <Step
                  number={2}
                  title='Excel Team'
                  date={client.excelTeam ? dayjs(client.excelTeam, 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY') : ''}
                  filled={(client.excelTeam || phase2Progress === phase2StepCount) ? 'full' : 'empty'}
                  fillColor={'textAcent-100'}
                  color={'textAcent-100'}/>
                <Step
                  number={1}
                  title='Docs Collected'
                  date={client.docsCollected ? dayjs(client.docsCollected, 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY') : ''}
                  filled={(client.docsCollected || phase2Progress === phase2StepCount) ? 'full' : 'empty'}
                  fillColor={'textAcent-100'}
                  color={'textAcent-100'}/>
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
                <div className="py-3 px-2.5">
                  <div className="flex justify-between text-lg font-semibold">
                    <div className='flex flex-col'>
                      <span>Phase 3 Payment</span>
                      <span className='text-xs font-normal italic'>
                        90% of PCV
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <div style={{ flex: 1 }}> {phase3Progress === phase3StepCount ? `$${NumberUtils.formatNumberWithCommas((phase3Payment).toFixed(2))}` : ''}</div>
                    </div>
                  </div>
                  <div className=" mt-1">
                    <SeparatorLine />
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-xs flex flex-row justify-between mt-2'>
                      <div className='flex-1' />
                      <span className='font-semibold flex-1 text-right'>Filed</span>
                      <span className='font-semibold flex-1 text-right'>Received</span>
                    </div>
                    <div className='text-xs flex flex-row justify-between'>
                      <span className='font-semibold flex-1 text-left'>PCV</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(phase3TotalPCV.toFixed(2))}</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(phase3FiledPCV.toFixed(2))}</span>
                    </div>
                    <div className='text-xs flex flex-row justify-between'>
                      <span className='font-semibold flex-1 text-left'>Total CV</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(phase3TotalCV.toFixed(2))}</span>
                      <span className='flex-1 text-right'>${NumberUtils.formatNumberWithCommas(phase3FiledCV.toFixed(2))}</span>
                    </div>
                  </div>
                </div>
                <SeparatorLine />
                <div className="py-3 px-2.5">
                  <p>Payouts</p>
                  <div className='mt-2'>
                    {
                      Array.isArray(payouts) && payouts.map((payout, idx) =>
                        <Step key={`phase3-payout-${idx}`}
                          number={idx + 1}
                          title={`$${NumberUtils.formatNumberWithCommas(payout.amount.toFixed(2))}`}
                          filled={'full'}
                          fillColor={'textAcent-200'}
                          date={payout.date}
                          color={''}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <QuarterModal companyName={client.companyName} quarters={client.quarters} isOpen={quartersVisible} onClose={() => setQuartersVisible(false)}/>
    </div>
  )
}

export default ErcModal

const QuarterModal = ({ companyName, quarters, isOpen, onClose }: {companyName: string, quarters: Client['quarters'], isOpen: boolean, onClose: () => void}) => {
  const mappedQuarters = quarters.map(q => ({ ...q, quarter: `Q${q.quarter}`, amount: q.amount ? 'Yes' : 'No', dateFiled: q.dateFiled ? dayjs(q.dateFiled, 'MM-DD-YYYY').format('MM/DD/YYYY') : 'Not yet available' }))
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
          <div className="bg-white w-[960px] h-[762px] rounded-lg max-h-[90vh] border border-black-500 px-2.5">
            {/* header  */}
            <div className="flex justify-between items-center pt-5 font-open-sans ">
              <p className="font-semibold font-lg">{companyName}</p>
              <div
                className="cursor-pointer text-2xl w-8 h-8"
                onClick={() => onClose()}
              >
                  x
              </div>
            </div>
            <p className="mt-2 font-semibold font-lg">IRS filing progress by Quarter</p>
            <p>
              Note:  ERC amount will be known prior to date filed in the process.  Date filed triggers completion of this step.
            </p>
            {/* body */}
            <div className='px-2.5 mt-5'>
              <ReactDataGrid
                idProperty="id"
                columns={columns}
                dataSource={mappedQuarters}
                sortable={true}
                style={gridStyle}
                defaultLimit={10}
                pagination={false}
              />
            </div>
            <div className='mt-2'>
              <p>
                Note:  For privacy reasons, we are prohibited to share specific ERC amounts
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

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

const definitionsMap = new Map()
definitionsMap.set('Waiting on a signed Engagement Letter', `We are waiting for the client to sign the Engagement Letter. Once the Engagement Letter is signed, the client will be assigned a Client Identification
Number and will be progressed to the Account Manager Department where they will be assigned an Account Manager and the client's customer
journey will begin.`)
definitionsMap.set('Unresponsive', 'This trigger will automatically flag after 12 business days of no document upload dates in the system or contact dates from the Client.')
definitionsMap.set('In process waiting on documents', `This is the first touch from the Account Manager. A welcome email has been sent, we will check the client's documents as they are uploaded, we
continue to communicate with the client to make sure they upload all of the documents that we need in order to progress the client forward within our
department to the next step.`)
definitionsMap.set('In process with Account Manager', `The client has uploaded all of their required documents. The Account Manager begins their final review process, if all is well, the client will progress
to the SETC Doc Prep Department. If there is anything outstanding and/or any other issues, we will revert the client to the status of "In process
waiting on documents" and we will wait until the client provides the necessary information we need in order to move the file forward.`)
definitionsMap.set('In process waiting on additional information', 'The client has uploaded documents, but the Account Manager is still waiting on additional information. (See notes in the client\'s profile for details).')
definitionsMap.set('In process waiting on client response', 'We have contacted the client and we are waiting for the client to respond to our communication.')
definitionsMap.set('In progress with Doc Specialist', 'A Document Specialist has been assigned a new client, work has started on calculations and qualifications.')
definitionsMap.set('Further documentation needed', `The client needs to be regressed back to the Account Manager for additional documentation and/or clarification needed on the current set of
documents.`)
definitionsMap.set('In review', `The client's File is being reviewed for final approval, once completed the client will be moved to the filing dept. Here is where the amended return
has been prepared and the amount that the client qualified for in 2020, 2021, or both, will be added into the software`)
definitionsMap.set('Waiting to be Assigned', 'The client file has been progressed to the Filing Dept and is waiting to be assigned to a Filing Specialist')
definitionsMap.set('Waiting to be Invoiced', 'The client\'s file has been assigned to a Filing Specialist and the client is waiting to be sent an invoice.')
definitionsMap.set('Invoice Sent', `An invoice has been sent to the client. This invoice contains information on what they qualify for and the cost associated with each year/qualification.
In the email that contains the invoice, the client is also informed as to the total amount they qualify for. At this point, we are waiting for the client to
pay the invoice so that we may progress the file forward to the next step which is to send out the 1040X forms for signature.`)
definitionsMap.set('1040X Sent', `The client invoice has been paid. We sent the client their 1040X documents for review and signature along with signing instructions. Once we
receive the signed 1040X documents, the client has reached the end of their journey with the Filing Department, and the file is progressed to the
SETC CPA Department.`)
definitionsMap.set('Client Call Requested', 'The client has requested a call and we have emailed them to find out what their specific questions are and/or to schedule the call.')
definitionsMap.set('Hold File Per Client Request', `The client has requested that we do not follow up with them for a certain period of time. (Review the note marked "URGENT" in the client's profile for
details).`)
definitionsMap.set('Hold File per Internal Request', `An internal Jorns associate has requested that we place the file on hold for a particular reason. (Review the note marked "URGENT" in the client's
profile for details).`)
definitionsMap.set('Working with Another Department', `We need some additional information and/or documentation related to this client. We are actively working with one or more of the other departments
in order to satisfy anything outstanding before we can take the necessary next steps either within our department or to progress the client to the next
department. (Review notes in the client's profile for additional details).`)
definitionsMap.set('Final Review and Document Filing', `The client's file has moved into the SETC CPA Department. A CPA has been assigned where they will perform a final review of all the documents
and figures associated with the amended return that has been prepared. Once this is completed, we will file the 1040X documents with the IRS.`)
definitionsMap.set('Filed with IRS', 'The filing CPA has sent the 1040X return(s) to the IRS. There is a tracking number added for our records. The file has now been completed.')
definitionsMap.set('DNP ( Do Not Process)', 'A refund or stop process has been initiated. (See notes in the client\'s profile for details).')
definitionsMap.set('Unresponsive Account Management', `The client has been moved to the Unresponsive Department, the department they were moved from is Account Management. (See notes in the
  client's profile for details).`)
definitionsMap.set('Unresponsive Doc Prep', `The client has been moved to the Unresponsive Department, the department they were moved from is Doc Prep. (See notes in the client's profile for
details).`)
definitionsMap.set('Unresponsive Filing', `The client has been moved to the Unresponsive Department, the department they were moved from is Filing. (See notes in the client's profile for
details).`)
definitionsMap.set('Client Complete', 'The client has been filed with the IRS, the referral agent has been paid, and the file is now complete.')

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
  let status = 'active'
  let accountStatus = 'Active'
  if (client.DNP === 'True') {
    status = 'cancelled'
    accountStatus = 'Does not qualify'
  }
  if (paidAmount < 0) {
    status = 'cancelled'
    accountStatus = 'Refunded/Cancelled'
  }
  const filedWithIRS = irsFiledDate && irsFiledDate !== 'N/A'
  //   const initialPayment = 200
  const familyQualified2020 = childCareQualified2020 || caregiverQualified2020
  const familyQualified2021 = childCareQualified2021 || caregiverQualified2021

  const phase1StepCount = 2
  const phase2StepCount = 6
  const phase3StepCount = 1
  // phase 1
  let phase1Progress = 0
  if (orderDate) phase1Progress++
  if (agreementSignedDate) phase1Progress++

  // phase 2
  let phase2Progress = 0
  if (client.sentDate) phase2Progress = phase2StepCount - 1
  if (client.paidDate) phase2Progress = phase2StepCount

  // if any step is done in phase 2, fill all phase1 steps
  if (phase2Progress > 0) phase1Progress = phase1StepCount

  // phase 3
  // eslint-disable-next-line prefer-const
  let phase3Progress = 0
  if (filedWithIRS) phase3Progress++

  const totalCV = (client.paidAmount || 0) / 2
  const commission = isPersonalClient ? 0 : totalCV * 0.4

  const invoiceProgressed = client.sentDate || client.paidDate

  return (
    <div>
      {isOpen && (
        <div className="absolute top-0 left-0 justify-center pl-44 flex  font-sans z-50 items-center h-screen w-screen bg-slate-800 bg-opacity-20 overflow-scroll">
          <div style={{ paddingBottom: 30 }} className="bg-white w-[960px]  rounded-lg ">
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
                    {' '}{accountStatus}
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
                    number={6}
                    title='Invoice Paid'
                    date={client.paidDate ? dayjs(client.paidDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                    filled={client.paidDate ? 'full' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={5}
                    title='Invoice Sent'
                    date={client.sentDate ? dayjs(client.sentDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : ''}
                    filled={client.sentDate ? 'full' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={4}
                    title='Taxpayer Qualified 2020'
                    date={invoiceProgressed ? taxpayerQualified2020 ? ' Yes' : 'No' : 'TBD'}
                    filled={invoiceProgressed ? taxpayerQualified2020 ? 'full' : 'empty' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={3}
                    title='Taxpayer Qualified 2021'
                    date={invoiceProgressed ? taxpayerQualified2021 ? ' Yes' : 'No' : 'TBD'}
                    filled={invoiceProgressed ? taxpayerQualified2021 ? 'full' : 'empty' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={2}
                    title='Family Qualified 2020'
                    date={invoiceProgressed ? familyQualified2020 ? 'Yes' : 'No' : 'TBD'}
                    filled={invoiceProgressed ? familyQualified2020 ? 'full' : 'empty' : 'empty'}
                    fillColor={'textAcent-100'}
                    color={'textAcent-100'}/>
                  <Step
                    number={1}
                    title='Family Qualified 2021'
                    date={invoiceProgressed ? familyQualified2021 ? 'Yes' : 'No' : 'TBD'}
                    filled={invoiceProgressed ? familyQualified2021 ? 'full' : 'empty' : 'empty'}
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
            <div style={{ marginLeft: 20 }}>
              <span style={{ fontWeight: 'bold' }}>Current Department: </span>  <span>{client.current_department}</span><br/><br/>
              <span style={{ fontWeight: 'bold' }}>Current Status: </span>  <span>{client.current_status}</span><br/><br/>
              <span style={{ fontWeight: 'bold' }}>Status Definition: </span>  <span>{definitionsMap.get(client.current_status)}</span>

              {client?.unresponsive_note.note && (
                <>
                  <br/><br/>
                  <span style={{ fontWeight: 'bold' }}>Action Needed: </span> <span style={{ padding: '0px 5px 2px 5px', fontSize: 20, backgroundColor: 'f2f2f2', border: '2px solid black' }}>{client?.unresponsive_note.note || ''} </span>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SetcModal

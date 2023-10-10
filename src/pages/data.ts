const _mapJornstaxResponse = (clients: any[]): any[] => {
  const mapClient = (d) => {
    const quarterKeys = Object.keys(d).filter(key => key.startsWith('erc_2'))
    const quarters = quarterKeys.map(key => ({
      year: key.substring(4, key.indexOf('_', 4)),
      quarter: key.substring(9).toUpperCase(),
      amount: d[key] as string,
      dateFiled: d[`date_filed_${key.substring(4, key.indexOf('_', 4))}_${key.substring(9)}`]
    }))
    const determinePhase = (d) => {
      // @javid TODO include phase 3
      if (d.ready_for_calculation_date) {
        return 2
      }
      return 1
    }
    return ({
      phase: determinePhase(d),
      email: d.Email,
      client: d.client,
      companyName: d.company_name,
      phone: d.phone_number,
      agreementSigned: d['q&a'] === 'Yes',
      depositPaid: d['deposit-amount'],
      docsCollected: d.ready_for_calculation_date,
      excelTeam: d.ready_for_calculation_date,
      docSentForSignature: d.date_moved_to_filing,
      docForSignatureReturned: d.client_sent_to_billing_date,
      quarters: quarters.map(q => ({ ...q, amount: q.amount ? '*' : '' })),
      signupDate: d['client-acquired-date'],
      totalCV: parseFloat((quarters.reduce((acc, curr) => {
        const amount = parseFloat(curr.amount ? curr.amount.replace('$', '') : '0')
        return acc + amount
      }, 0) * 0.1).toFixed(2)),
      status: d.dnp.toLowerCase() === 'yes' ? 'cancelled' : 'active'
    })
  }
  return clients.map(mapClient)
}
const data = [
  {
    client: 16323,
    company_name: 'Eagle Auto Body and Paint/Eagle Off Road',
    referrals: 'Snap/SD',
    phone_number: '(504) 912-3661',
    Email: 'tterrita@yahoo.com',
    urgent: 'No',
    dnp: 'Yes',
    'dnp-date': null,
    'client-acquired-date': '10-09-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '10-09-2023 02:49 pm',
    'q&a': 'Yes',
    recovery_startup: 'FALSE',
    ppp1: 'Yes',
    ppp2: 'Yes',
    revenue: 'No',
    os_review_status: 'Not Assinged',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 10,
        2020: 10,
        2021: 10
      },
      part_time: {
        2019: 'N/A',
        2020: 'N/A',
        2021: 'N/A'
      }
    }
  },
  {
    client: 16317,
    company_name: 'APEX Personal Training and Fitness, LLC',
    referrals: 'Snap/SD',
    phone_number: '(406) 901-2698',
    Email: 'iNFjc@jornstax.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '09-27-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '09-27-2023 03:08 pm',
    'q&a': 'Yes',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: '6',
        2020: '6',
        2021: '6'
      }
    }
  },
  {
    client: 16312,
    company_name: 'AC Pacific Corporation',
    referrals: 'Snap/SD',
    phone_number: '(909) 980-6262',
    Email: 'charlie@acpacific.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '10-06-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '10-06-2023 04:01 pm',
    'q&a': 'No',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  },
  {
    client: 16302,
    company_name: 'El Hidalguense Restaurant',
    referrals: 'Snap/SD',
    phone_number: '(832) 773-8522',
    Email: 'gude@elhidr.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '10-05-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '10-05-2023 03:24 pm',
    'q&a': 'No',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  },
  {
    client: 16292,
    company_name: 'Scrap Now Metal Recycling',
    referrals: 'Snap/SD',
    phone_number: '(229) 850-0409',
    Email: 'jasoncox@scrapnowmetal.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '10-04-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '10-09-2023 01:39 pm',
    'q&a': 'No',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  },
  {
    client: 16286,
    company_name: 'Test',
    referrals: null,
    phone_number: '(561) 628-9230',
    Email: 'garetthagan@gmail.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '10-04-2023',
    rate: '20.00',
    'deposit-amount': '$0.00',
    status: null,
    ready_for_os_date: '',
    'q&a': 'No',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Not Assinged',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  },
  {
    client: 16280,
    company_name: 'Advanced Technology of Kentucky Inc',
    referrals: null,
    phone_number: '',
    Email: 'pOQvzljNzJDKpF0Wa0-1951@jornstax.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '10-03-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '10-03-2023 10:02 am',
    'q&a': 'No',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'Yes',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  },
  {
    client: 16273,
    company_name: 'Linh Vietnamese Cuisine LLC',
    referrals: 'Snap/SD',
    phone_number: '(479) 221-0392',
    Email: 'flamboyant072011@yahoo.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '10-02-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '10-02-2023 04:05 pm',
    'q&a': 'No',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  },
  {
    client: 16257,
    company_name: 'RiverHills Bank',
    referrals: 'Snap/SD',
    phone_number: '(513) 214-8575',
    Email: 'twilliams@rhb24.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '09-29-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '09-29-2023 10:00 am',
    'q&a': 'No',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 0,
        2020: 0,
        2021: 0
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  },
  {
    client: 16250,
    company_name: 'Tri-County Christian School',
    referrals: 'Snap/SD',
    phone_number: '(660) 385-7188',
    Email: 'nathan.martin.tccs@gmail.com',
    urgent: 'No',
    dnp: 'No',
    'dnp-date': null,
    'client-acquired-date': '09-28-2023',
    rate: '20.00',
    'deposit-amount': '$2,600.00',
    status: 'Account Manager - In Process',
    ready_for_os_date: '09-28-2023 02:35 pm',
    'q&a': 'Yes',
    recovery_startup: 'FALSE',
    ppp1: 'No',
    ppp2: 'No',
    revenue: 'No',
    os_review_status: 'Active',
    ready_for_calculation_date: '',
    ready_for_qualifications_date: '',
    ready_for_doc_prep_date: '',
    client_sent_to_billing_date: '',
    erc_2020_q1: null,
    erc_2020_q2: null,
    erc_2020_q3: null,
    erc_2020_q4: null,
    erc_2021_q1: null,
    erc_2021_q2: null,
    erc_2021_q3: null,
    erc_2021_q4: null,
    total_erc: null,
    date_filed_2020_q2: null,
    date_filed_2020_q3: null,
    date_filed_2020_q4: null,
    date_filed_2021_q1: null,
    date_filed_2021_q2: null,
    date_filed_2021_q3: null,
    date_filed_2021_q4: null,
    date_moved_to_filing: null,
    employee_count: {
      w2_ft: {
        2019: 25,
        2020: 26,
        2021: 24
      },
      part_time: {
        2019: 0,
        2020: 0,
        2021: 0
      }
    }
  }
]

const mockData = _mapJornstaxResponse(data)
export default mockData
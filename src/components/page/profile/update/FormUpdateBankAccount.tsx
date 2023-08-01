import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { updateUserPassword } from 'lib/services/user/updateUserPassword'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { getUserMe } from 'lib/services/user/getUserMe'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { GTMTrack } from 'lib/utils/gtm'

import { signInRulesConfig } from 'components/page/login/LoginForm/utils/formRules'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { InputProfile } from '../commons/InputProfile'
import { Button } from 'components/common/Button'
import Alert from '@material-ui/lab/Alert'
import {useTranslation} from "next-i18next";

interface IFormUpdatePasswordProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  accountHolderName: string
  city: string
  firstLine: string
  accountNumber: string
  postCode: string
  abartn: string
  legalType: string
}

const states = [
  {
    code: 'AA',
    name: 'Armed Forces Americas'
  },
  {
    code: 'AE',
    name: 'Armed Forces Europe'
  },
  {
    code: 'AP',
    name: 'Armed Forces Pacific'
  },
  {
    code: 'AL',
    name: 'Alabama'
  },
  {
    code: 'AK',
    name: 'Alaska'
  },
  {
    code: 'AZ',
    name: 'Arizona'
  },
  {
    code: 'AR',
    name: 'Arkansas'
  },
  {
    code: 'CA',
    name: 'California'
  },
  {
    code: 'CO',
    name: 'Colorado'
  },
  {
    code: 'CT',
    name: 'Connecticut'
  },
  {
    code: 'DE',
    name: 'Delaware'
  },
  {
    code: 'FL',
    name: 'Florida'
  },
  {
    code: 'GA',
    name: 'Georgia'
  },
  {
    code: 'HI',
    name: 'Hawaii'
  },
  {
    code: 'ID',
    name: 'Idaho'
  },
  {
    code: 'IL',
    name: 'Illinois'
  },
  {
    code: 'IN',
    name: 'Indiana'
  },
  {
    code: 'IA',
    name: 'Iowa'
  },
  {
    code: 'KS',
    name: 'Kansas'
  },
  {
    code: 'KY',
    name: 'Kentucky'
  },
  {
    code: 'LA',
    name: 'Louisiana'
  },
  {
    code: 'ME',
    name: 'Maine'
  },
  {
    code: 'MD',
    name: 'Maryland'
  },
  {
    code: 'MA',
    name: 'Massachusetts'
  },
  {
    code: 'MI',
    name: 'Michigan'
  },
  {
    code: 'MN',
    name: 'Minnesota'
  },
  {
    code: 'MS',
    name: 'Mississippi'
  },
  {
    code: 'MO',
    name: 'Missouri'
  },
  {
    code: 'MT',
    name: 'Montana'
  },
  {
    code: 'NE',
    name: 'Nebraska'
  },
  {
    code: 'NV',
    name: 'Nevada'
  },
  {
    code: 'NH',
    name: 'New Hampshire'
  },
  {
    code: 'NJ',
    name: 'New Jersey'
  },
  {
    code: 'NM',
    name: 'New Mexico'
  },
  {
    code: 'NY',
    name: 'New York'
  },
  {
    code: 'NC',
    name: 'North Carolina'
  },
  {
    code: 'ND',
    name: 'North Dakota'
  },
  {
    code: 'OH',
    name: 'Ohio'
  },
  {
    code: 'OK',
    name: 'Oklahoma'
  },
  {
    code: 'OR',
    name: 'Oregon'
  },
  {
    code: 'PA',
    name: 'Pennsylvania'
  },
  {
    code: 'RI',
    name: 'Rhode Island'
  },
  {
    code: 'SC',
    name: 'South Carolina'
  },
  {
    code: 'SD',
    name: 'South Dakota'
  },
  {
    code: 'TN',
    name: 'Tennessee'
  },
  {
    code: 'TX',
    name: 'Texas'
  },
  {
    code: 'UT',
    name: 'Utah'
  },
  {
    code: 'VT',
    name: 'Vermont'
  },
  {
    code: 'VA',
    name: 'Virginia'
  },
  {
    code: 'WA',
    name: 'Washington'
  },
  {
    code: 'WV',
    name: 'West Virginia'
  },
  {
    code: 'WI',
    name: 'Wisconsin'
  },
  {
    code: 'WY',
    name: 'Wyoming'
  },
  {
    code: 'DC',
    name: 'District of Columbia'
  }
]

const recipientTypes = [
  {
    code: 'PRIVATE',
    name: 'Person'
  },
  {
    code: 'BUSINESS',
    name: 'Business'
  }
]

const accountTypes = [
  {
    code: 'CHECKING',
    name: 'Checking'
  },
  {
    code: 'SAVINGS',
    name: 'Savings'
  }
]

export const FormUpdateBankAccount = ({ auth, setAuth, typeUpdate, setTypeUpdate }: IFormUpdatePasswordProps) => {
  const { t } = useTranslation('profile')
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()

  const [legalType, setlegalType] = useState(auth.bank_information?.legalType || '')
  const [accountType, setaccountType] = useState(auth.bank_information?.accountType || '')
  const [state, setstate] = useState(auth.bank_information?.state || '')
  const [errorMessage, setErrorMessage] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    const res = await fetch('/api/user/update-bank-information', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accountHolderName: dataForm.accountHolderName,
        abartn: dataForm.abartn,
        accountNumber: dataForm.accountNumber,
        city: dataForm.city,
        firstLine: dataForm.firstLine,
        postCode: dataForm.postCode,
        legalType,
        accountType,
        state
      })
    })

    if (res.status === 400) {
      toast(t('update_bank.error_message'), { type: 'error' })
      setIsLoading(false)
      setErrorMessage(true)
      return
    }

    const { data: userData, error: userError } = await getUserMe({ token: auth.accessToken })

    setAuth({
      ...auth,
      bank_information: { ...userData.bank_information }
    })

    toast(t('update_bank.success_message'), { type: 'success' })
    setTypeUpdate(null)
    setIsLoading(false)
  }

  if (isLoading) {
    return <SpinnerPageContent />
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>{t('update_bank.title')}</h3>
      </section>

      {errorMessage && (
        <>
          <br />
          <Alert severity="error">{t('update_bank.error_message2')}</Alert>
        </>
      )}

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>

        <InputProfile
          inputId='accountHolderName'
          inputType='text'
          labelFor='accountHolderName'
          labelName={t('update_bank.account_holder_name')}
          placeholder=''
          register={register}
          rules={{}}
          defaultValue={auth.bank_information?.accountHolderName || ''}
        />

        <div
          className='relative rounded-xl bg-white w-full px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between'>
          <label htmlFor="test1" className='text-sm mb-2'>{t('update_bank.recepient_type')}</label>
          <div className="relative">
            <select
              id='legalType'
              name='legalType'
              className='cursor-pointer relative block xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
              placeholder={t('update_bank.user_rank')}
              onChange={(current) => { setlegalType(current.target.value) }}
            >
              <>
                <option disabled selected>{t('update_bank.select_recipient_type')}</option>
                {recipientTypes.map(value => {
                  let selected = false
                  if (value.code === legalType) selected = true
                  return (
                    <option selected={selected} className='text-black' value={value.code}>{value.name}</option>
                  )
                })}
              </>
            </select>
          </div>
        </div>

        <div
          className='relative rounded-xl bg-white w-full px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between'>
          <label htmlFor="test1" className='text-sm mb-2'>{t('update_bank.account_type')}</label>
          <div className="relative">
            <select
              id='accountType'
              name='accountType'
              className='cursor-pointer relative block xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
              onChange={(current) => { setaccountType(current.target.value) }}
            >
              <>
                <option disabled selected>{t('update_bank.select_account_type')}</option>
                {accountTypes.map(value => {
                  let selected = false
                  if (value.code === accountType) selected = true
                  return (
                    <option selected={selected} className='text-black' value={value.code}>{value.name}</option>
                  )
                })}
              </>
            </select>
          </div>
        </div>

        <InputProfile
          inputId='abartn'
          inputType='text'
          labelFor='abartn'
          labelName={t('update_bank.abartn')}
          placeholder={t('update_bank.abartn_placeholder')}
          register={register}
          rules={{}}
          defaultValue={auth.bank_information?.abartn || ''}
        />

        <InputProfile
          inputId='accountNumber'
          inputType='text'
          labelFor='accountNumber'
          labelName={t('update_bank.account_number')}
          placeholder={t('update_bank.account_number_placeholder')}
          register={register}
          rules={{}}
          defaultValue={auth.bank_information?.accountNumber || ''}
        />

        <InputProfile
          inputId='city'
          inputType='text'
          labelFor='city'
          labelName={t('update_bank.city')}
          placeholder=''
          register={register}
          rules={{}}
          defaultValue={auth.bank_information?.city || ''}
        />

        <InputProfile
          inputId='firstLine'
          inputType='text'
          labelFor='firstLine'
          labelName={t('update_bank.first_line')}
          placeholder=''
          register={register}
          rules={{}}
          defaultValue={auth.bank_information?.firstLine || ''}
        />

        <div
          className='relative rounded-xl bg-white w-full px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between'>
          <label htmlFor="test1" className='text-sm mb-2'>{t('update_bank.state')}</label>
          <div className="relative">
            <select
              id='state'
              name='state'
              className='cursor-pointer relative block xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
              onChange={(current) => { setstate(current.target.value) }}
            >
              <>
                <option disabled selected>{t('update_bank.select_state')}</option>
                {states.map(value => {
                  let selected = false
                  if (value.code === state) selected = true
                  return (
                    <option selected={selected} className='text-black' value={value.code}>{value.name}</option>
                  )
                })}
              </>
            </select>
          </div>
        </div>

        <InputProfile
          inputId='postCode'
          inputType='text'
          labelFor='postCode'
          labelName={t('update_bank.post_code')}
          placeholder=''
          register={register}
          rules={{}}
          defaultValue={auth.bank_information?.postCode || ''}
        />

        <br />

        {errorMessage && (
          <>
            <Alert severity="error">{t('update_bank.error_message3')}</Alert>
            <br/>
          </>
        )}

        <div className='flex items-center'>
          <Button type='submit' classes='mr-2'>{t('update_bank.save')}</Button>
          <Button onClick={() => setTypeUpdate(null)}>
            {t('update_bank.cancel')}
          </Button>
        </div>
      </form>
    </div>
  )
}

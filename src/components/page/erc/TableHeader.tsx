// eslint-disable-next-line no-use-before-define
import React from 'react'
import { TableHeaderProps } from 'lib/types/transaction'
import { Spinner } from 'components/common/loaders'

const TableHeader: React.FC<TableHeaderProps> = ({
  tableName,
  loading,
  setMonthSelected,
  setYearSelected
}) => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'All Time'
  ]

  const years = []
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i)
  }
  return (
    <div className="flex items-center">
      <div className='flex flex-col md:flex-row items-center  w-full justify-between'>
        <div className="text-xl font-sans font-semibold text-black my-2">
          {tableName}
        </div>
        {
          typeof setMonthSelected === 'function' && typeof setYearSelected === 'function' && (
            <div className='border-2 rounded-full border-[#DCE5ED] my-2'>
              <select
                id="legalType"
                name="legalType"
                className="ml-5 font-semibold cursor-pointer relative xs:mr-2 pl-2 pr-10 py-2 bg-[rgba(255,255,255,.13)] outline-none appearance-none leading-8 border-r-2"
                placeholder="User Rank"
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%), linear-gradient(to right, #ccc0, #ccc0)',
                  backgroundPosition: 'calc(100% - 16px) calc(1em + 2px), calc(100% - 11px) calc(1em + 2px), calc(100% - 2.5em) 0.5em',
                  backgroundSize: '5px 5px, 5px 5px, 1px 1.5em',
                  backgroundRepeat: 'no-repeat'
                }}
                onChange={(current) => {
                  setMonthSelected(parseInt(current.target.value))
                }}
              >
                {month.map((m, i) => {
                  return (
                    <option key={i} selected={new Date().getMonth() === i} value={i}>
                      {m}
                    </option>
                  )
                })}
              </select>
              <select
                id="legalType"
                name="legalType"
                className="ml-5 cursor-pointer font-semibold relative xs:mr-2 pl-2 pr-10 py-2 bg-[rgba(255,255,255,.13)] outline-none appearance-none leading-8"
                placeholder="User Rank"
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%), linear-gradient(to right, #ccc0, #ccc0)',
                  backgroundPosition: 'calc(100% - 16px) calc(1em + 2px), calc(100% - 11px) calc(1em + 2px), calc(100% - 2.5em) 0.5em',
                  backgroundSize: '5px 5px, 5px 5px, 1px 1.5em',
                  backgroundRepeat: 'no-repeat'
                }}
                onChange={(current) => {
                  setYearSelected(parseInt(current.target.value))
                }}
              >
                {years.map((y, i) => {
                  return (
                    <option key={i} selected={new Date().getFullYear() === y} value={y}>
                      {y}
                    </option>
                  )
                })}
              </select>
            </div>
          )
        }
      </div>
      {
        loading && (
          <div className='flex flex-row items-center'>
            <span className='mr-2 font-semibold'>This can take up to 1-2 minutes</span>
            <Spinner />
          </div>
        )
      }
    </div>
  )
}

export default TableHeader

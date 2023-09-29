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
    'December'
  ]

  const years = []
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i)
  }
  return (
    <div className="flex items-center justify-between">
      <div className='flex items-center'>
        <div className="text-lg font-sans font-semibold text-gray-800">
          {tableName}
        </div>
        {
          typeof setMonthSelected === 'function' && typeof setYearSelected === 'function' && (
            <>
              <select
                id="legalType"
                name="legalType"
                className="ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8"
                placeholder="User Rank"
                onChange={(current) => {
                  setMonthSelected(parseInt(current.target.value))
                }}
                style={{ border: 'none' }}
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
                className="ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8"
                placeholder="User Rank"
                onChange={(current) => {
                  setYearSelected(parseInt(current.target.value))
                }}
                style={{ border: 'none' }}
              >
                {years.map((y, i) => {
                  return (
                    <option key={i} selected={new Date().getFullYear() === y} value={y}>
                      {y}
                    </option>
                  )
                })}
              </select>
            </>
          )
        }
      </div>
      {
        loading && (
          <Spinner />
        )
      }
    </div>
  )
}

export default TableHeader

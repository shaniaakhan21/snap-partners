// eslint-disable-next-line no-use-before-define
import React from 'react'
import { TypePaginationProps } from '@inovua/reactdatagrid-community/types'

interface PaginationToolbarProps extends TypePaginationProps{
    currentPage: number;
    total: number;
    onPageChange: (page: number) => unknown
}

const PageNumber = ({ page, selected, onClick }) => {
  return (
    <li
      key={page}
      className={`px-1 ${selected ? 'border-b-4 border-black' : ''}`}
      onClick={() => onClick(page)}
    >
      <button onClick={() => onClick(page)} className={`${selected ? 'font-bold' : 'font-normal'}`}>
        {page}
      </button>
    </li>
  )
}

const PaginationToolbar = (props:PaginationToolbarProps) => {
  const { currentPage, total, limit, onPageChange } = props
  const totalPages = Math.ceil(total / limit)

  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const renderPageNumbers = () => {
    if (totalPages <= 9) {
      return pageNumbers.map((number) => (
        <PageNumber page={number} onClick={onPageChange} selected={number === currentPage}/>
      ))
    }

    const visiblePages = 8
    const ellipsisStart = currentPage - visiblePages > 1 ? '...' : ''

    const startPage = currentPage - visiblePages > 1 ? currentPage - visiblePages : 1
    const endPage = currentPage + 1 < totalPages ? currentPage + 1 : totalPages

    const pageItems = []

    if (startPage > 1) {
      pageItems.push(
        <PageNumber page={1} selected={currentPage === 1} onClick={onPageChange}/>
      )

      if (startPage > 2) {
        pageItems.push(
          <li key="ellipsis-start">
            {ellipsisStart}
          </li>
        )
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <PageNumber page={i} selected={currentPage === i} onClick={onPageChange}/>
      )
    }

    const ellipsisEnd = currentPage + 1 < totalPages ? '...' : ''

    if (endPage < totalPages) {
      pageItems.push(
        <li key="ellipsis-end">
          {ellipsisEnd}
        </li>
      )

      pageItems.push(
        <PageNumber page={totalPages} selected={currentPage === totalPages} onClick={onPageChange}/>
      )
    }

    return pageItems
  }

  return (
    <ul className="flex space-x-1 justify-center gap-4">
      <button onClick={() => onPageChange(currentPage - 1)}>
        {'<'}
      </button>
      {renderPageNumbers()}
      <button onClick={() => onPageChange(currentPage + 1)}>
        {'>'}
      </button>
    </ul>
  )
}

export default PaginationToolbar

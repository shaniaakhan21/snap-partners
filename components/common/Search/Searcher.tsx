import { ChangeEvent, useRef, useState } from 'react'
import { HitsList, HitUser } from '.'
import { SearchIcon } from '../icons'
import { searchFilter } from 'lib/utils/searchFilter'
import { IUserData } from 'lib/types/user'

interface IProps {
  data: {}[]
  selectInfo: {
    selectDefaultValue: string,
    selectOptions: { [key: string]: string }[]
  }
  hitsLimit?: number
  hitDefaultMsg?: string
  searchPlaceholderMsg?: string
}

export const Searcher = ({
  data,
  selectInfo,
  hitsLimit = 5,
  hitDefaultMsg = 'What do you want to search?',
  searchPlaceholderMsg = 'Search...'
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>()

  const [searchResults, setSearchResults] = useState<{}[] | null>(null)
  const [searchProperty, setSearchProperty] = useState('name')

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchProperty(e.target.value)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value

    if (searchWord === '') {
      setSearchResults(null)
      return
    }

    const results = searchFilter({ data, searchProperty, searchWord, hitsLimit })
    setSearchResults(results)
  }

  const handleClickCloseSearch = () => {
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <header className='flex items-center border-b border-gray-300 pb-2'>
        <SearchIcon classes='w-8 h-8' />
        <form className='w-full flex items-center h-10 ml-1'>
          <select
            className='h-full px-1 mr-1 rounded-sm text-center text-gray-800 border border-gray-400 transition-colors bg-transparent hover:bg-gray-200 focus:border-primary-300 focus:bg-transparent focus:outline-none'
            onChange={handleChangeSelect}
            defaultValue={selectInfo.selectDefaultValue}
          >
            {selectInfo.selectOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className='text-left'
              >
                {option.text}
              </option>
            ))}
          </select>

          <input
            type='search'
            placeholder={searchPlaceholderMsg}
            maxLength={64}
            autoCapitalize='off'
            aria-autocomplete='list'
            ref={inputRef}
            onChange={handleChangeInput}
            className='w-full h-full rounded-sm outline-none input-clear placeholder-gray-600 text-gray-800 border border-gray-400 transition-colors px-4 hover:bg-gray-200 focus:border-primary-300'
          />
        </form>
      </header>

      <div className='border-b border-gray-300 py-4'>
        {searchResults && (
          <HitsList>
            {searchResults.map((hit: IUserData) => (
              <HitUser
                key={hit.id}
                hit={hit}
                onClick={handleClickCloseSearch}
              />
            ))}
          </HitsList>
        )}
        {!searchResults && !inputRef.current?.value && (
          <p className='text-textHint'>
            {hitDefaultMsg}
          </p>
        )}
        {searchResults?.length === 0 && (
          <p className='text-textHint'>
            Something called &quot;
            <span className='text-black font-bold'>{inputRef.current.value}</span>
            &quot; has not been found.
          </p>
        )}
      </div>
    </>
  )
}

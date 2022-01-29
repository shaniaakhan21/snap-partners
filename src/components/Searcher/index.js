import React, { useRef, useState } from "react"
import { searchFilter } from '../../utils/searchFilter'
import { HitsList } from "./HitList"
import { HitUser } from "./HitUser"
import { SearchIcon } from "../icons"
import { useStyles } from "./styles"

export const Searcher = ({ 
  data, 
  selectInfo, 
  hitsLimit = 5, 
  hitDefaultMsg = 'What do you want to search?', 
  searchPlaceholderMsg = 'Search...' 
}) => {
  const classes = useStyles()

  const inputRef = useRef()

  const [searchResults, setSearchResults] = useState(null)
  const [searchProperty, setSearchProperty] = useState('name')

  const handleChangeSelect = (e) => {
    setSearchProperty(e.target.value)
  }

  const handleChangeInput = (e) => {
    const searchWord = e.target.value

    if (searchWord === '') {
      setSearchResults(null)
      return
    }

    // DEBEMOS USAR BIEN EL RESULTADO DEL SEARCH FILTER Y EL COMPONENTE
    const results = searchFilter({ data, searchProperty, searchWord, hitsLimit })
    setSearchResults(results)
  }

  const handleClickCloseSearch = () => {
    document.body.style.overflow = 'auto'
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <SearchIcon width='32' height='32' fill='#FF998B' />
        <form className={classes.form}>
          <select 
            className={classes.select} 
            onChange={handleChangeSelect}
            defaultValue={selectInfo.selectDefaultValue}
          >
            {selectInfo.selectOptions.map((option) => (
              <option 
                key={option.value}
                value={option.value}
                className={classes.option}
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
            className={classes.input}
          />
        </form>
      </header>

      <div className={classes.contentContainer}>
        {searchResults && (
          <HitsList>
            {searchResults.map((hit) => (
              <HitUser
                key={hit.id}
                hit={hit}
                onClick={handleClickCloseSearch}
              />
            ))}
          </HitsList>
        )}
        {!searchResults && !inputRef.current?.value && (
          <p className={classes.textDefaultMsg}>
            {hitDefaultMsg}
          </p>
        )}
        {searchResults?.length === 0 && (
          <p className={classes.textDefaultMsg}>
            Something called &quot;
            <span className={classes.textValue}>{inputRef.current.value}</span>
            &quot; has not been found.
          </p>
        )}
      </div>
    </div>
  )
}
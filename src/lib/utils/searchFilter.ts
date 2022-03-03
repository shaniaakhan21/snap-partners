interface IProps {
  data: {}[]
  searchProperty: string
  searchWord: string
  hitsLimit: number
}

export const searchFilter = ({
  data,
  searchProperty,
  searchWord,
  hitsLimit
}: IProps) => {
  const filters = Object.keys(data[0])

  if (!filters.includes(searchProperty)) return []

  const results = data.filter((element) => {
    const filteredData = element[searchProperty]
      .toLowerCase()
      .includes(searchWord.toLowerCase())

    return filteredData
  })

  return results.slice(0, hitsLimit)
}

// const filters = ['id', 'name', 'email', 'phone']

export const searchFilter = ({
  data,
  searchProperty,
  searchWord,
  hitsLimit,
}) => {
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
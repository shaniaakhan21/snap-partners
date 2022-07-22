export const monthlyGenerator = (date) => {
  const addMonths = (month, quantity) => {
    const monthToReturn = new Date(month.getTime())
    monthToReturn.setMonth(monthToReturn.getMonth() + quantity)
    return monthToReturn.getMonth() + 1
  }

  return {
    month1: date.getMonth() + 1,
    month2: addMonths(date, 1),
    month3: addMonths(date, 2),
    month6: addMonths(date, 5),
    month12: addMonths(date, 11)
  }
}

export default function parseStringToBoolean (commInfo) {
  let value
  for (value in [...Array(3)]) {
    try {
      if (typeof (commInfo[`methodComm_${value}`]) === 'string') {
        if (commInfo[`preference_${value}`] === 'Preferred') {
          commInfo[`methodComm_${value}`] = true
        } else {
          commInfo[`methodComm_${value}`] = false
        }
      }
    } catch (e) {
    }
  }

  return commInfo
}

const getMinDuration = delta => {
  if (delta === 0) {
    return 0
  }
  if (delta <= 10) {
    return 1
  }
  if (delta <= 25) {
    return 2.5
  }
  if (delta <= 50) {
    return 4
  }
  if (delta <= 75) {
    return 5.5
  }
  if (delta <= 100) {
    return 7
  }
  return 8
}
export default getMinDuration
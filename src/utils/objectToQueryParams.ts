export default function objectToQueryParams<
  P extends Record<string | number, string | number | boolean>
>(obj: P) {
  const queryParams = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]

      // Skip null and undefined values
      if (value === null || value === undefined) {
        continue
      }

      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
    }
  }

  return queryParams.join('&')
}

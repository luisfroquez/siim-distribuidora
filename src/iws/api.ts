import objectToQueryParams from '@/utils/objectToQueryParams'
import axios, { AxiosResponse } from 'axios'
import { SHA256 } from 'crypto-js'

import { Endpoint, Params } from './types'

const utcTimestamp = new Date().toISOString()

function encrypt(texto: string) {
  const hash = SHA256(texto).toString()
  return hash
}

const signature = encrypt(
  `${process.env.NEXT_PUBLIC_API_KEY},${process.env.NEXT_PUBLIC_ACCESS_KEY},${utcTimestamp}`
)

const token = `apiKey=${process.env.NEXT_PUBLIC_API_KEY}&utcTimeStamp=${utcTimestamp}&signature=${signature}`

export const fetchApiData = async <T, P extends Params>(
  endpoint: Endpoint,
  queryParams: P
) => {
  const hasQueryParams = Object.entries(queryParams ?? {})?.length > 0

  const query = hasQueryParams ? `?${objectToQueryParams(queryParams)}` : ''

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_IWS_TEST_API_URL}/${endpoint}${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data as T
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'API Error')
  }
}

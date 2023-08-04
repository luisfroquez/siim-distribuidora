// import objectToQueryParams from '@/utils/objectToQueryParams'
// import axios from 'axios'
// import { SHA256 } from 'crypto-js'

// import {
//   NEXT_PUBLIC_ACCESS_KEY,
//   NEXT_PUBLIC_API_KEY,
//   NEXT_PUBLIC_IWS_TEST_API_URL,
// } from '@/app/config'

// import type { Endpoint, Params } from './types'

// const utcTimestamp = new Date().toISOString()

// function encrypt(texto: string) {
//   const hash = SHA256(texto).toString()
//   return hash
// }

// const signature = encrypt(
//   `${NEXT_PUBLIC_API_KEY},${NEXT_PUBLIC_ACCESS_KEY},${utcTimestamp}`
// )

// const token = `apiKey=${NEXT_PUBLIC_API_KEY}&utcTimeStamp=${utcTimestamp}&signature=${signature}`

// export const fetchApiData = async <T, P extends Params>(
//   endpoint: Endpoint,
//   queryParams: P
// ) => {
//   const hasQueryParams = Object.entries(queryParams ?? {})?.length > 0

//   const query = hasQueryParams ? `?${objectToQueryParams(queryParams)}` : ''

//   try {
//     const response = await axios.get(
//       `${NEXT_PUBLIC_IWS_TEST_API_URL}/${endpoint}${query}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )

//     return response.data as T
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'API Error')
//   }
// }

import objectToQueryParams from '@/utils/objectToQueryParams'
import axios from 'axios'
import { SHA256 } from 'crypto-js'

import {
  NEXT_PUBLIC_ACCESS_KEY,
  NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_IWS_TEST_API_URL,
} from '@/app/config'

import type { Endpoint, Params } from './types'

const utcTimestamp = new Date().toISOString()

function encrypt(texto: string): string {
  // Added return type for encrypt function
  const hash = SHA256(texto).toString()
  return hash
}

const signature = encrypt(
  `${NEXT_PUBLIC_API_KEY ?? ''},${NEXT_PUBLIC_ACCESS_KEY ?? ''},${utcTimestamp}`
)

const token = `apiKey=${
  NEXT_PUBLIC_API_KEY ?? ''
}&utcTimeStamp=${utcTimestamp}&signature=${signature}`

export const fetchApiData = async <T, P extends Params>(
  endpoint: Endpoint,
  queryParams: P
): Promise<T> => {
  // Added return type for fetchApiData function
  const hasQueryParams = Object.entries(queryParams ?? {})?.length > 0

  const query = hasQueryParams ? `?${objectToQueryParams(queryParams)}` : ''

  try {
    const response = await axios.get<T>( // Added type argument T to axios.get
      `${NEXT_PUBLIC_IWS_TEST_API_URL ?? ''}/${endpoint}${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (e) {
    throw new Error('API Error')
  }
}

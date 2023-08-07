// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'

// import { updateIwsProducts } from '@/app/_actions/update-products-iws'

// // UPDATES CATALOG EVERY 24HS.
// export function GET(request: NextRequest) {
//   return updateIwsProducts()
//     .then(() => {
//       return NextResponse.json(
//         {
//           body: request.body,
//           path: request.nextUrl.pathname,
//           query: request.nextUrl.search,
//           cookies: request.cookies.getAll(),
//         },
//         {
//           status: 200,
//         }
//       )
//     })
//     .catch((e: unknown) => {
//       return NextResponse.json(
//         {
//           body: request.body,
//           path: request.nextUrl.pathname,
//           query: request.nextUrl.search,
//           cookies: request.cookies.getAll(),
//           error: e,
//         },
//         {
//           status: 400,
//         }
//       )
//     })
// }

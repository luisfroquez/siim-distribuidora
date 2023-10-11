import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/signin(.*)',
    '/signup(.*)',
    '/sso-callback(.*)',
    '/api(.*)',
    '/contacto(.*)',
    '/tienda(.*)',
    '/blog(.*)',
    '/email-preferences(.*)',
    '/sitemap(.*)',
    '/ayuda(.*)',
    '/politicas-de-cookies(.*)',
  ],
  signInUrl: '/signin',
})

// export default authMiddleware({
//   debug: process.env.NODE_ENV === 'development',
//   // Public routes are routes that don't require authentication
//   publicRoutes: [
//     '/',
//     '/signin(.*)',
//     '/signup(.*)',
//     '/sso-callback(.*)',
//     '/api(.*)',
//     '/contacto(.*)',
//     '/tienda(.*)',
//     '/blog(.*)',
//     '/email-preferences(.*)',
//     '/sitemap(.*)',
//     '/ayuda(.*)',
//     '/politicas-de-cookies(.*)',
//   ],

//   async afterAuth(auth, req) {
//     if (auth.isPublicRoute) {
//       //  For public routes, we don't need to do anything
//       return NextResponse.next({ status: 200 })
//     }

//     const url = new URL(req.nextUrl.origin)

//     if (!auth.userId) {
//       //  If user tries to access a private route without being authenticated,
//       //  redirect them to the sign in page
//       url.pathname = '/signin'
//       return NextResponse.redirect(url)
//     }

//     // Set the user's role to user if it doesn't exist
//     const user = await clerkClient.users.getUser(auth.userId)

//     if (!user) {
//       throw new Error('User not found.')
//     }

//     // If the user doesn't have a role, set it to user
//     if (!user.privateMetadata.role) {
//       await clerkClient.users.updateUser(auth.userId, {
//         privateMetadata: {
//           ...user.privateMetadata,
//           role: 'user' satisfies UserRole,
//         },
//       })
//     }
//   },
// })

// Stop Middleware running on static files
export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
}

import { NextResponse } from 'next/server'
import { withAuth, NextRequestWithAuth, NextAuthMiddlewareOptions } from 'next-auth/middleware'

const middleware = (request: NextRequestWithAuth) => {
  if (!request.nextauth.token) {
    return NextResponse.rewrite(new URL('/signin', request.url))
  }
  NextResponse.rewrite(new URL('/signin', request.url))
}

const callbackOptions: NextAuthMiddlewareOptions = {
  callbacks:{
    authorized: ({token}) => !!token
  }
}

export default withAuth(middleware, callbackOptions)

export const config = {
  matcher: '/private/:path*'
}
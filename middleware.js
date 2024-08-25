// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  // // Access cookies from the request
  const cookies = request.cookies;
  console.log(cookies);
  
  // // Get the accessToken from cookies
  const accessToken = cookies.get('accessToken');

  console.log("accessToken");
  console.log(accessToken);
    
  // // Check if the accessToken is null or undefined
  if (!accessToken) {
    // console.log(request.url);
    console.log(request);

    const url = new URL(`/auth/login`, request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname||"/");
    return NextResponse.redirect(url);

    // return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Continue to the next middleware or the requested page
  return NextResponse.next();
}

// Define the paths where this middleware should be applied
export const config = {
  matcher: [
    /*
    Exclude paths like '/auth/login' and '/auth/register'
    by including all paths except these specific ones.
    */
    '/((?!auth/login|auth/register|.next/static|favicon.ico|icon.png).*)',
  ],
};


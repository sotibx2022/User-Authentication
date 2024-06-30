import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(path);
    
    const isPublicPath = (path === "/signup" || path === "/login");
    const cookie = request.cookies.get("token");
    
    let response;
    
    if (cookie && isPublicPath) {
        response = NextResponse.redirect(new URL("/profile", request.url));
    } else if (!cookie && !isPublicPath) {
        response = NextResponse.redirect(new URL("/login", request.url));
    }
    
    return response || NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    
    '/signup',
    '/login/',
    '/profile/',
    '/profile/:path*'
  ]
};

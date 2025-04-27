import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const openRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/about',
    '/contact',
    '/terms-of-service',
    '/privacy-policy',
]

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;
    console.log('Middleware running for:', pathname);
    console.log('Token:', token);

    if (openRoutes.includes(pathname) && !token) {
        return NextResponse.next();
    } else if (token && !openRoutes.includes(pathname)) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));

}

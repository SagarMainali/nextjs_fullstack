import { NextRequest, NextResponse } from "next/server";

// middleware logic for redirection
export async function middleware(request: NextRequest) {
    const token = 'asdf1234';
    const { pathname } = request.nextUrl;

    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login'],
}

'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";

export const middleware = async  (request) => {

    const token = request.cookies.get('token')?.value;
    const urlLogin = new URL('/', request.url);
    const urlDashboard = new URL('/', request.url);
    const isTokenValidated = await validateToken(token);

    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/dashboard') {
            return NextResponse.redirect(urlLogin);
        }
    }else{
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(urlDashboard);
    }
    NextResponse.next();
} if(!isTokenValidated || !token) {
    if (request.nextUrl.pathname === '/pages/alter') {
        return NextResponse.redirect(urlLogin);
}
} if(!isTokenValidated || !token) {
    if (request.nextUrl.pathname === '/pages/register'){
        return NextResponse.redirect(urlLogin)
    }
}
}

export const config = {
    matcher: ['/', '/pages/dashboard', '/pages/alter', '/pages/register']
}


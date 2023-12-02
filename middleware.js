import {NextRequest, NextResponse} from "next/server";

export { withAuth } from 'next-auth/middleware';

export default withAuth(
    //withAuth - augments your 'Request' with the user's token.
    function middleware(req){
        console.log(req.nextauth);
        if(
            req.nextUrl.pathname === '/admin-dashboard' &&
                req.nextauth.token?.role !== 'admin'
        ) {
            return new NextResponse('You are not authorised!');
        }
    },
    {
        callbacks: {
            authorised: (params) => {
                let { token } = params;
                return !!token;
            },
        },
    }
)

export const config = {master: ['/admin-dashboard','/profile-page']};
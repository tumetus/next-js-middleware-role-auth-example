import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth);
    if (
      req.nextUrl.pathname === "/admin-dashboard" &&
      req.nextauth.token?.role !== "admin"
    ) {
      //   return NextResponse.rewrite(
      //     new URL("/api/auth/signin?callbackUrl=%2Fadmin-dashboard", req.url)
      //   );

      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin-dashboard", "/faq"] };

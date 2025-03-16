// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//     const token = await getToken({ req });
//     console.log(token);
  
//     if (!token) {
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }
  
//     // // Restrict access to admin dashboard
//     // if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
//     //   return NextResponse.redirect(new URL("/unauthorized", req.url));
//     // }
  
//     return NextResponse.next();
//   }
  
//   export const config = {
//     matcher: ["/dashboard","/dashboard/:path*"], 
//   };
  
export { default } from "next-auth/middleware"

export const config = { matcher: [
    "/dashboard(/.*)?", "/dashboard/listing"
  ], }
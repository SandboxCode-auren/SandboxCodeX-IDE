export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/repositories/:path*",
    "/runtime/:path*",
    "/console/:path*",
    "/timeline/:path*",
    "/artifacts/:path*",
    "/settings/:path*",
  ],
};

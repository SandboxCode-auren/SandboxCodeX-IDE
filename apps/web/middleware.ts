import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

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

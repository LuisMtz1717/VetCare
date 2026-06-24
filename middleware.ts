import { auth } from "@/lib/auth";

export default auth((req) => {});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/mis-mascotas/:path*",
    "/mis-citas/:path*",
    "/admin/:path*",
  ],
};
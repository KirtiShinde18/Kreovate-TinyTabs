import { NextRequest, NextResponse } from "next/server";

const proxy = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const adminToken = req.cookies.get("ADMIN")?.value;
  const employeeToken = req.cookies.get("EMPLOYEE")?.value;

  // 🔐 Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 💼 Employee routes protection
  if (pathname.startsWith("/employee")) {
    if (!employeeToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*"],
};

export default proxy;
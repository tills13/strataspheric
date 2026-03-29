import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|css|js|woff2?|ttf|eot)$).*)"],
};

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    const start = Date.now();
    const response = NextResponse.next();
    const duration = Date.now() - start;

    console.log(
      `${request.method} ${request.nextUrl.pathname}${request.nextUrl.search} ${duration}ms`,
    );

    return response;
  }

  return NextResponse.next();
}

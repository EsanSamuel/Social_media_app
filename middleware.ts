import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  response.headers.set("x-custom-auth-header", "isAuthed");
  console.log("response header", response.headers);
}

export const config = {
  matcher: "/",
};

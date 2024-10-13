// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Lấy cookie từ request
  const token = req.cookies.get('auth_token');

  // Nếu không có token, chuyển hướng về trang login
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Nếu có token, cho phép tiếp tục
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các routes trừ trang login
export const config = {
  matcher: '/manage/:path*',
};

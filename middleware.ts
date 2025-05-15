import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';

  const userAgent = req.headers.get('user-agent') ?? 'Unknown';
  const url = req.url;
  const time = new Date().toISOString();

  // Sadece frontend dosyaları (ör: .js, .css, .png) veya api/log yoluna POST atmamak için filtre ekleyebilirsin.
  // Burada sadece anasayfa ve diğer sayfalar için POST isteği atacağız.

  // POST ile ziyaretçi bilgisi kaydet API’sine gönderiyoruz
  if (req.nextUrl.pathname !== '/api/log' && !req.nextUrl.pathname.startsWith('/_next')) {
    fetch(`${req.nextUrl.origin}/api/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip, userAgent, url, time }),
    }).catch(console.error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api/log).*)', // api/log haricindeki tüm route'larda çalışsın
};

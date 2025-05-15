import { NextRequest, NextResponse } from "next/server";

// Basit kayıtlar için bellek içi array kullanalım (resetlendiğinde sıfırlanır)
let logs: Array<{ ip: string; userAgent: string; url: string; time: string }> = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    logs.push(data);
    return NextResponse.json({ success: true, message: "Kayıt eklendi." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata var." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(logs);
}

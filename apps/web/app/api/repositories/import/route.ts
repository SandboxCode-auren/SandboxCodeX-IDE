import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const url = body.url?.trim();

  if (!url) {
    return NextResponse.json(
      { error: "Repository URL is required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    url,
    message: "Import request received",
  });
}

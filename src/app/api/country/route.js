import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const country =
    (await headers()).get("x-vercel-ip-country") || "IN";

  return NextResponse.json({
    country,
  });
}
import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getDashboardStats();

    return NextResponse.json(
      {
        success: true,
        error: false,
        stats: {
          totalLinksCreated: stats.totalLinksCreated,
          totalQRCodesGenerated: stats.totalQRCodesGenerated,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("[ShortenX] Stats API failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: true,
        stats: {
          totalLinksCreated: 0,
          totalQRCodesGenerated: 0,
        },
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}

import { NextResponse } from "next/server";
import { getAllCampaigns } from "@/lib/api";

export const revalidate = 60;

export async function GET() {
  try {
    const campaigns = await getAllCampaigns();
    return NextResponse.json({
      success: true,
      count: campaigns?.length,
      campaigns: campaigns?.slice(0, 1),
    });
  } catch (err) {
    console.error("Test API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

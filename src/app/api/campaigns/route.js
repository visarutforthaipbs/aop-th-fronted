import { NextResponse } from "next/server";
import { getAllCampaigns } from "@/lib/api";

export const revalidate = 60;

export async function GET() {
  try {
    const campaigns = await getAllCampaigns();
    return NextResponse.json(campaigns || []);
  } catch (error) {
    console.error("Error in campaigns API:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns", campaigns: [] },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getAllCampaigns } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const campaigns = await getAllCampaigns();
    return NextResponse.json(campaigns || []);
  } catch (error) {
    console.error("Error in campaigns API:", error);
    return NextResponse.json([], { status: 500 });
  }
}

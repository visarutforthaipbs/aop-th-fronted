import { NextResponse } from "next/server";
import { getAllCampaigns, getAuthToken } from "@/lib/api";

export async function GET() {
  try {
    const token = await getAuthToken();
    const campaigns = await getAllCampaigns(token);

    return NextResponse.json(campaigns || []);
  } catch (error) {
    console.error("Error in campaigns API:", error);
    return NextResponse.json([], { status: 500 });
  }
}

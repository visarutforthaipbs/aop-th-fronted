import { NextResponse } from "next/server";
import { getAllCampaigns, getAuthToken } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // const token = await getAuthToken();
        const campaigns = await getAllCampaigns(null); // passing null token
        return NextResponse.json({ success: true, count: campaigns?.length, campaigns: campaigns?.slice(0, 1) });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.stack || err.toString() });
    }
}

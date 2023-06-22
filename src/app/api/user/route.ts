import { getUser } from "@/lib/service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    return NextResponse.json(await getUser());
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}

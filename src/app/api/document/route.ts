import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body) {
    return new Response("No body", { status: 400 });
  }
  try {
    await db.document.create({
      data: {
        name: body.name,
        data: body.data,
      },
    });

    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET(req: Request) {
  try {
    const documents = await db.document.findMany();
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

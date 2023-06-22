import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await db.document.findFirst({
      where: { id: params.id as string },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  if (!body) {
    return new Response("No body", { status: 400 });
  }
  try {
    await db.document.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        data: body.data,
      },
    });
    pusherServer.trigger(`document-${body.id}`, "update", body.data);

    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.document.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.error();
  }
}

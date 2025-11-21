import { connectDB } from "@/lib/mongodb";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    await Story.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Story deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const updatedData = await req.json();
    const story = await Story.findByIdAndUpdate(params.id, updatedData, {
      new: true,
    });
    return NextResponse.json(story);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
  }
}

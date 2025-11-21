import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Story from "@/models/Story";

// DELETE story by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await context.params;

    await Story.findByIdAndDelete(id);

    return NextResponse.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Failed to delete story:", error);
    return NextResponse.json(
      { error: "Failed to delete story" },
      { status: 500 }
    );
  }
}

// UPDATE story by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await context.params;
    const updatedData = await req.json();

    const story = await Story.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!story) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error("Failed to update story:", error);
    return NextResponse.json(
      { error: "Failed to update story" },
      { status: 500 }
    );
  }
}

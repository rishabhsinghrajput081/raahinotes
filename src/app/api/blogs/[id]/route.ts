import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// ✅ DELETE blog by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Error deleting blog" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE blog by ID (Edit)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const data = await req.json();

    const updatedBlog = await Blog.findByIdAndUpdate(params.id, data, {
      new: true, // returns the updated document
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Error updating blog" },
      { status: 500 }
    );
  }
}

import { connectDB } from "@/lib/mongodb";
import Blog, { IBlog } from "@/models/Blog";
import { NextResponse } from "next/server";

// GET all blogs
export async function GET() {
  await connectDB();
  const blogs: IBlog[] = await Blog.find({});
  return NextResponse.json(blogs);
}

// POST a new blog
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const blog = await Blog.create(body);
  return NextResponse.json(blog, { status: 201 });
}

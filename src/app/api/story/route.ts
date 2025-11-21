import { connectDB } from "@/lib/mongodb";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const stories = await Story.find().sort({ createdAt: -1 });
    return NextResponse.json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // ✅ Validate required fields
    if (!data.title || !data.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // ✅ Validate route points (if any)
    let routePoints = [];
    if (Array.isArray(data.routePoints)) {
      routePoints = data.routePoints
        .filter(
          (point) =>
            point.lat &&
            point.lng &&
            typeof point.lat === "number" &&
            typeof point.lng === "number"
        )
        .map((point) => ({
          lat: point.lat,
          lng: point.lng,
          label: point.label || "",
        }));
    }

    // ✅ Create new story with all fields
    const story = new Story({
      title: data.title,
      quote: data.quote || "",
      description: data.description,
      mapImage: data.mapImage || "",
      photoImage: data.photoImage || "",
      routePoints, // ✅ Add map route data here
    });

    await story.save();
    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error("Error adding story:", error);
    return NextResponse.json(
      { error: "Failed to add story" },
      { status: 500 }
    );
  }
}

import { connectDB } from "@/lib/mongodb";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

// Type for route points to remove implicit "any"
type RoutePoint = {
  lat: number;
  lng: number;
  label?: string;
};

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

    // Required field validation
    if (!data.title || !data.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Validate and clean routePoints
    let routePoints: RoutePoint[] = [];

    if (Array.isArray(data.routePoints)) {
      routePoints = data.routePoints
        .filter((point: RoutePoint) => {
          return (
            point &&
            typeof point.lat === "number" &&
            typeof point.lng === "number"
          );
        })
        .map((point: RoutePoint) => ({
          lat: point.lat,
          lng: point.lng,
          label: point.label || "",
        }));
    }

    // Create story document
    const story = new Story({
      title: data.title,
      quote: data.quote || "",
      description: data.description,
      mapImage: data.mapImage || "",
      photoImage: data.photoImage || "",
      routePoints,
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

import mongoose, { Schema, Document } from "mongoose";

export interface IRoutePoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface IStory extends Document {
  title: string;
  quote?: string;
  description: string;
  mapImage?: string;
  photoImage?: string;
  routePoints?: IRoutePoint[];
  createdAt: Date;
}

const StorySchema = new Schema<IStory>(
  {
    title: { type: String, required: true },
    quote: { type: String },
    description: { type: String, required: true },
    mapImage: { type: String },
    photoImage: { type: String },
    routePoints: [
      {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Story ||
  mongoose.model<IStory>("Story", StorySchema);

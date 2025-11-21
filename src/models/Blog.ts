import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAffiliateLink {
  name: string;
  url: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  image?: string;
  category?: string;
  affiliateLinks?: IAffiliateLink[];
  createdAt: Date;
}

const BlogSchema: Schema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  affiliateLinks: [{ name: String, url: String }],
  createdAt: { type: Date, default: Date.now },
});

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;

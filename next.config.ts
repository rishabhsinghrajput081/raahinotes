import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // optional for direct Unsplash links
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Cloudinary added here
      },
    ],
  },
}

export default nextConfig

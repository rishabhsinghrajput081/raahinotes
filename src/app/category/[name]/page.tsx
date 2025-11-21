"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  category?: string;
}

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  // ✅ unwrap promise (Next.js 15+)
  const { name } = use(params);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // ✅ Always fetch all then filter locally (works regardless of API)
        const res = await fetch("/api/blogs", { cache: "no-store" });
        const data = await res.json();

        const filtered = Array.isArray(data)
          ? data.filter(
              (b) =>
                b.category?.toLowerCase().trim() === name.toLowerCase().trim()
            )
          : [];

        setBlogs(filtered);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [name]);

  // ✅ Color themes per category
  const theme = {
    Mountains: { gradient: "from-[#e8eefb] to-white", accent: "text-blue-700" },
    Beach: { gradient: "from-[#eafafc] to-white", accent: "text-cyan-700" },
    Hotels: { gradient: "from-[#fdf2e9] to-white", accent: "text-amber-700" },
    Default: { gradient: "from-[#e6f8ec] to-white", accent: "text-green-700" },
  };
  const selected = theme[name as keyof typeof theme] || theme.Default;

  return (
    <div className="min-h-screen bg-white">
      {/* --- Hero Section --- */}
      <div className={`bg-gradient-to-b ${selected.gradient} py-20 text-center`}>
        <h1
          className={`text-4xl md:text-5xl font-extrabold ${selected.accent} mb-4 capitalize tracking-tight`}
        >
          {name} Adventures
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg px-4">
          Discover curated experiences, travel stories, and guides inspired by
          the beauty of {name}.
        </p>
      </div>

      {/* --- Blog Grid Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No blogs found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group block rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 bg-white"
              >
                {/* --- Image --- */}
                {blog.image ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-200 h-72 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* --- Content --- */}
                <div className="p-5 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {blog.title}
                  </h2>
                  {blog.category && (
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-2">
                      {blog.category}
                    </p>
                  )}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-green-700 font-medium hover:text-green-900"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

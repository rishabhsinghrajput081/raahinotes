"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  category?: string;
}

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <section className="py-20 bg-white">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-20 tracking-tight">
        Traveller Stories
      </h1>

      {/* ✅ Changed grid to 2 columns for larger cinematic cards */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-16 container mx-auto px-6">
        {blogs.map((blog) => (
          <ScrollStoryCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
}

function ScrollStoryCard({ blog }: { blog: Blog }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: false });

  return (
    <motion.a
      ref={ref}
      href={`/blog/${blog.slug}`}
      initial={{ opacity: 0, scale: 0.95, y: 60 }}
      animate={
        inView
          ? { opacity: 1, scale: 1.05, y: 0 }
          : { opacity: 0.7, scale: 0.96, y: 40 }
      }
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.07,
        boxShadow: "0px 20px 60px rgba(0,0,0,0.25)",
      }}
      className="relative group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700"
    >
      {/* Image */}
      {blog.image ? (
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={800}
          className="object-cover w-full h-[26rem] transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="bg-gray-200 h-[26rem] flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 p-8 text-white">
        <h2 className="text-3xl font-semibold mb-3 leading-tight">
          {blog.title}
        </h2>
        {blog.category && (
          <p className="text-sm text-gray-300 uppercase tracking-wide mb-2">
            {blog.category}
          </p>
        )}
        <span className="inline-block text-green-300 font-semibold group-hover:text-green-200 transition">
          Read More →
        </span>
      </div>
    </motion.a>
  );
}

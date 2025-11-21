"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  category?: string;
  content?: string;
}

interface Story {
  _id: string;
  title: string;
  quote: string;
  description: string;
  mapImage?: string;
  photoImage?: string;
}

function safeImage(
  url?: string,
  fallback = "https://source.unsplash.com/800x600/?travel"
) {
  try {
    if (url && (url.startsWith("http") || url.startsWith("/"))) return url;
  } catch {}
  return fallback;
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    Promise.all([fetch("/api/blogs"), fetch("/api/story")])
      .then(async ([blogsRes, storiesRes]) => {
        const blogsData = await blogsRes.json();
        const storiesData = await storiesRes.json();
        setBlogs(Array.isArray(blogsData) ? blogsData.slice(0, 3) : []);
        setStories(Array.isArray(storiesData) ? storiesData.slice(0, 2) : []);
      })
      .catch(() => {
        setBlogs([]);
        setStories([]);
      });
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* --- HERO --- */}
      <section className="bg-gradient-to-b from-green-100 via-white to-white py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-900 mb-4"
        >
          Explore Journeys. Feel the Stories.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg"
        >
          Discover tales of mountains, beaches, and hidden adventures shared
          by travellers around the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href="/stories"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all"
          >
            Read Stories →
          </Link>
        </motion.div>
      </section>

      {/* --- FEATURED STORY --- */}
      {stories[0] && (
        <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <Image
              src={safeImage(stories[0].mapImage || stories[0].photoImage)}
              alt={stories[0].title}
              width={800}
              height={600}
              priority
              decoding="async"
              className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {stories[0].title}
            </h2>

            <blockquote className="italic text-green-700 border-l-4 border-green-500 pl-4 mb-4">
              “{stories[0].quote || "Adventure begins where comfort ends."}”
            </blockquote>

            <div
              className="text-gray-700 leading-relaxed prose max-w-none line-clamp-6 mb-4"
              dangerouslySetInnerHTML={{ __html: stories[0].description }}
            />

            <Link
              href="/stories"
              className="inline-block text-green-600 font-medium hover:text-green-800"
            >
              Read Full Story →
            </Link>
          </motion.div>
        </section>
      )}

      {/* --- LATEST BLOGS --- */}
      {blogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Latest Adventure Blogs
          </h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden"
              >
                <Image
                  src={safeImage(blog.image)}
                  alt={blog.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-64"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {blog.category}
                  </p>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-green-600 font-medium hover:text-green-800"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* --- MIXED MOSAIC SECTION (FIXED VERSION BELOW) --- */}
      {(stories.length > 1 || blogs.length > 1) && (
        <section className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            From the Trails & Beaches
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[...stories.slice(1), ...blogs.slice(0, 1)].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={
                    // Story
                    (item as Story).photoImage
                      ? safeImage((item as Story).photoImage)
                      : // Blog
                        (item as Blog).image
                      ? safeImage((item as Blog).image)
                      : // Fallback
                        "https://source.unsplash.com/800x600/?adventure"
                  }
                  alt={item.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-80"
                />

                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  {"quote" in item && (
                    <p className="italic text-green-700 mb-3">“{item.quote}”</p>
                  )}

                  <Link
                    href={"slug" in item ? `/blog/${item.slug}` : "/stories"}
                    className="text-green-600 font-medium hover:text-green-800"
                  >
                    View →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center text-gray-600 border-t">
        <p className="text-lg">
          “Every journey tells a story — where will yours begin?”
        </p>
      </footer>
    </main>
  );
}

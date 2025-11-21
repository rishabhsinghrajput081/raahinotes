"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Story {
  _id: string;
  title: string;
  quote: string;
  description: string;
  mapImage?: string;
  photoImage?: string;
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch("/api/story")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setStories(data);
        else setStories([]);
      })
      .catch(() => setStories([]));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header gradient + title */}
      <section className="text-center py-20 bg-gradient-to-b from-green-100 via-white to-white">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Traveller Stories
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A collection of journeys shared by travellers — through maps,
          moments, and reflections.
        </p>
      </section>

      {/* Story grid */}
      <div className="space-y-24 max-w-6xl mx-auto px-6 pb-24">
        {stories.map((story, index) => (
          <motion.div
            key={story._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Map or static image */}
            <div className="flex-1">
              <Image
                src={
                  story.mapImage && (story.mapImage.startsWith("http") || story.mapImage.startsWith("/"))
                    ? story.mapImage
                    : "https://source.unsplash.com/800x600/?map,travel"
                }
                alt={story.title || "Map placeholder"}
                width={800}
                height={600}
                className="rounded-2xl shadow-lg object-cover w-full h-[350px]"
              />
            </div>

            {/* Text and Photo */}
            <div className="flex-1">
              {story.title && (
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {story.title}
                </h2>
              )}

              {story.quote && (
                <blockquote className="italic text-green-700 text-lg border-l-4 border-green-500 pl-4 mb-4">
                  “{story.quote}”
                </blockquote>
              )}

              {story.description && (
                <div
                  className="text-gray-700 leading-relaxed prose max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: story.description }}
                />
              )}

              {story.photoImage && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl overflow-hidden shadow-md max-w-sm mx-auto"
                >
                  <Image
                    src={
                      story.photoImage.startsWith("http") || story.photoImage.startsWith("/")
                        ? story.photoImage
                        : "https://source.unsplash.com/600x400/?adventure,travel"
                    }
                    alt={story.title || "Story image"}
                    width={600}
                    height={400}
                    className="object-cover w-full h-[250px]"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}

        {stories.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No stories found — add some from your admin panel.
          </p>
        )}
      </div>
    </div>
  );
}

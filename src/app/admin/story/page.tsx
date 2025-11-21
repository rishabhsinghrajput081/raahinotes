"use client";

import { useState, useEffect } from "react";

export default function AdminStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    quote: "",
    description: "",
    mapImage: "",
    photoImage: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all stories
  useEffect(() => {
    fetch("/api/story")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setStories(data);
        else if (data) setStories([data]);
        else setStories([]);
      })
      .catch(() => setStories([]));
  }, []);

  // Add or update story
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/story/${editingId}` : "/api/story";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newStory = await res.json();
      if (editingId) {
        setStories((prev) =>
          prev.map((s) => (s._id === editingId ? newStory : s))
        );
      } else {
        setStories((prev) => [newStory, ...prev]);
      }

      setForm({
        title: "",
        quote: "",
        description: "",
        mapImage: "",
        photoImage: "",
      });
      setEditingId(null);
    } else {
      alert("Error saving story");
    }
  };

  // Delete story
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this story?");
    if (!confirmDelete) return;
    const res = await fetch(`/api/story/${id}`, { method: "DELETE" });
    if (res.ok) setStories((prev) => prev.filter((s) => s._id !== id));
  };

  // Edit story
  const handleEdit = (story: any) => {
    setForm({
      title: story.title,
      quote: story.quote,
      description: story.description,
      mapImage: story.mapImage || "",
      photoImage: story.photoImage || "",
    });
    setEditingId(story._id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Manage Stories
        </h1>

        {/* --- Story Form --- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-5 mb-12"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Story Title"
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Short Quote"
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              required
            />
          </div>

          <textarea
            placeholder="Write a brief description..."
            className="w-full border border-gray-300 bg-gray-100 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Map Image URL"
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              value={form.mapImage}
              onChange={(e) => setForm({ ...form, mapImage: e.target.value })}
            />
            <input
              type="text"
              placeholder="Photo Image URL"
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              value={form.photoImage}
              onChange={(e) => setForm({ ...form, photoImage: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
          >
            {editingId ? "Update Story" : "Add Story"}
          </button>
        </form>

        {/* --- Story List --- */}
        <ul className="space-y-4">
          {stories.map((story) => (
            <li
              key={story._id}
              className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis line-clamp-2">
                  {story.description}
                </p>
              </div>

              <div className="flex gap-2 mt-3 sm:mt-0 shrink-0">
                <button
                  onClick={() => handleEdit(story)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

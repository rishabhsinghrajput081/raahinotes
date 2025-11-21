"use client";

import { useState, useEffect } from "react";
import AdminLogoutButton from "@/components/AdminLogoutButton";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[\s\W-]+/g, "-");
}

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [affiliateName, setAffiliateName] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogData = {
      title,
      slug: slugify(title),
      content,
      image,
      category,
      affiliateLinks:
        affiliateName && affiliateUrl
          ? [{ name: affiliateName, url: affiliateUrl }]
          : [],
    };

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      await fetchBlogs();
      resetForm();
    } else {
      alert("Error adding blog");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });

    if (res.ok) {
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } else {
      alert("Error deleting blog");
    }
  };

  const startEditing = (blog: any) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(blog.image || "");
    setCategory(blog.category || "");
    setAffiliateName(blog.affiliateLinks?.[0]?.name || "");
    setAffiliateUrl(blog.affiliateLinks?.[0]?.url || "");
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const updatedBlog = {
      title,
      slug: slugify(title),
      content,
      image,
      category,
      affiliateLinks:
        affiliateName && affiliateUrl
          ? [{ name: affiliateName, url: affiliateUrl }]
          : [],
    };

    const res = await fetch(`/api/blogs/${editingBlog._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });

    if (res.ok) {
      await fetchBlogs();
      resetForm();
      setEditingBlog(null);
    } else {
      alert("Error updating blog");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage("");
    setCategory("");
    setAffiliateName("");
    setAffiliateUrl("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <AdminLogoutButton />
      </div>

      {/* Blog Form */}
      <form
        onSubmit={editingBlog ? handleEditSave : handleSubmit}
        className="space-y-4 border p-4 rounded"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content (HTML or plain text)"
          className="w-full border p-2 rounded"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded mb-2"
          />
        )}

        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Stories">Stories</option>
          <option value="Mountains">Mountains</option>
          <option value="Beach">Beach</option>
          <option value="Hotels">Hotels</option>
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Affiliate Name"
            className="flex-1 border p-2 rounded"
            value={affiliateName}
            onChange={(e) => setAffiliateName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Affiliate URL"
            className="flex-1 border p-2 rounded"
            value={affiliateUrl}
            onChange={(e) => setAffiliateUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`${
            editingBlog ? "bg-yellow-600" : "bg-green-600"
          } text-white px-4 py-2 rounded`}
        >
          {editingBlog ? "Save Changes" : "Add Blog"}
        </button>

        {editingBlog && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              setEditingBlog(null);
            }}
            className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Blog List */}
      <h2 className="text-xl font-semibold mt-8 mb-4">All Blogs</h2>
      <ul className="space-y-2">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.category}</p>
              <a
                href={`/blog/${blog.slug}`}
                className="text-blue-600 underline"
                target="_blank"
              >
                View Blog
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEditing(blog)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

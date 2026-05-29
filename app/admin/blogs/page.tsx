"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { accessToken, user } = useAuth();

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((d) => setBlogs(d.blogs || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!title || !content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, content, authorId: user?.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs([data.blog, ...blogs]);
        setTitle("");
        setContent("");
        setShowForm(false);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
              Manage Blogs
            </h1>
            <p className="text-[#64748B] mt-1">{blogs.length} blog posts</p>
          </div>
          <Button variant="primary" size="md" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Blog"}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">
              New Blog Post
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title..."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#4F46E5] text-sm"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Blog content..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#4F46E5] text-sm resize-none"
            />
            <Button variant="primary" size="md" loading={saving} onClick={handleAdd}>
              Publish Blog
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-4 animate-pulse h-16" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <p className="text-[#94A3B8] text-lg">No blog posts yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex items-center justify-between gap-4 hover:shadow-sm transition-all">
                <div>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A]">
                    {blog.title}
                  </p>
                  <p className="text-[#94A3B8] text-xs mt-1">
                    {new Date(blog.publishedAt).toLocaleDateString("en-IN")} · /blogs/{blog.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/blogs/${blog.slug}`} target="_blank">
                    <Button variant="ghost" size="sm">View</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
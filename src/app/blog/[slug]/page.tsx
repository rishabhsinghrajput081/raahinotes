import { connectDB } from "@/lib/mongodb";
import Blog, { IBlog } from "@/models/Blog";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function safeImage(url?: string, fallback = "https://source.unsplash.com/1200x800/?travel") {
  try {
    if (url && (url.startsWith("http") || url.startsWith("/"))) return url;
  } catch {
    /* ignore */
  }
  return fallback;
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();

  const blog: IBlog | null = await Blog.findOne({ slug });

  if (!blog)
    return (
      <main className="text-center mt-20 text-2xl text-gray-600">
        Blog not found
      </main>
    );

  return (
    <article className="bg-white min-h-screen pb-24">
      {/* --- HERO / COVER --- */}
      {blog.image && (
        <header className="relative w-full h-[60vh] overflow-hidden">
          <Image
            src={safeImage(blog.image)}
            alt={blog.title || "Travel blog banner"}
            fill
            priority
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white px-4">
            <h1 className="text-5xl font-extrabold mb-3 drop-shadow-md leading-tight">
              {blog.title}
            </h1>
            {blog.category && (
              <p className="text-lg uppercase tracking-wider text-green-300 font-semibold">
                {blog.category}
              </p>
            )}
          </div>
        </header>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto mt-16 px-6 text-gray-800">
        <div
          className="
            prose 
            prose-lg 
            prose-green 
            max-w-none
            prose-a:text-green-700 
            prose-a:underline 
            hover:prose-a:text-green-900
            leading-relaxed
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* --- AFFILIATE PRODUCTS --- */}
        {blog.affiliateLinks && blog.affiliateLinks.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Featured Products
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {blog.affiliateLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="
                    block bg-gradient-to-b from-white to-green-50 border border-gray-200 rounded-xl shadow-sm 
                    hover:shadow-lg hover:-translate-y-1 hover:border-green-200 transition-all duration-300
                    text-center py-6 px-4
                  "
                >
                  <p className="text-green-700 font-medium text-lg">
                    {link.name} →
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* --- BACK BUTTON --- */}
        <footer className="mt-16 text-center">
          <Link
            href="/"
            className="text-green-700 hover:text-green-900 font-semibold underline underline-offset-4 transition-all"
          >
            ← Back to Home
          </Link>
        </footer>
      </main>
    </article>
  );
}

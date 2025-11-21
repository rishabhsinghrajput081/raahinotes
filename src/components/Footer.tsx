import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4">

        {/* FLEX LAYOUT */}
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">

          {/* LEFT SIDE — BRAND */}
          <div>
            <h3 className="text-xl font-semibold tracking-wide mb-1">
              RahiNotes
            </h3>
            <p className="text-gray-600 text-sm">
              Travel stories, guides, photos and real journeys.
            </p>
          </div>

          {/* RIGHT SIDE — SOCIAL ICONS */}
          <div className="flex gap-6 mt-6 md:mt-0">

            <a 
              href="https://www.instagram.com/_rajput_12_11_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-500 transition"
            >
              <FaInstagram size={28} />
            </a>

            <a 
              href="https://www.youtube.com/@LifeBeyondTheScreens/shorts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-red-600 transition"
            >
              <FaYoutube size={30} />
            </a>

          </div>
        </div>

        {/* COPYRIGHT */}
        <p className="text-gray-500 text-sm text-center mt-6">
          © {new Date().getFullYear()} RahiNotes. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import type { Metadata } from "next"
import "leaflet/dist/leaflet.css"

export const metadata: Metadata = {
  title: "RahiNotes | Travel Stories, Guides, Photos, Hotels and Real Journeys",
  description:
    "RahiNotes is a travel journal sharing real journeys, destination guides, hotel stays, visual stories, and photography. Explore travel tips, local experiences, hidden spots, and trusted recommendations with affiliate links for hotels and travel gear.",

  openGraph: {
    title: "RahiNotes | Travel Stories, Guides, Photos and Real Journeys",
    description:
      "Explore travel stories, hotel reviews, destination guides, and photo journals on RahiNotes. Real adventures, helpful insights, and curated recommendations for travellers around the world.",
    url: "https://www.rahinotes.com",
    siteName: "RahiNotes",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "RahiNotes | Travel Stories and Guides",
    description:
      "Read travel stories, hotel guides, photography journals, and personal journeys across destinations worldwide on RahiNotes.",
    creator: "@_rajput_12_11_",
  },

  alternates: {
    canonical: "https://www.rahinotes.com",
  },

  metadataBase: new URL("https://www.rahinotes.com"),

  authors: [
    {
      name: "RahiNotes",
      url: "https://www.instagram.com/_rajput_12_11_/",
    },
  ],

  creator: "RahiNotes",
  publisher: "RahiNotes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

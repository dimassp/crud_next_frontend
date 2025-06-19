import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PWA Next | Login",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Dimas Surya Prayitna",
      url: "https://www.linkedin.com/in/dimas-prayitna/",
    },

  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon/puzzle-128.png" },
    { rel: "icon", url: "icons/icon/puzzle-128.png" },
  ],
};

export default function Page() {
  return (
    <>
      <div>
        <h1>Login page</h1>
      </div>
    </>
  )
}

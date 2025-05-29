import type { Metadata } from "next";
import { DataTable } from "@/components/data-table"
import Component from "@/components/ClientComponent";
import data from "./data.json"

export const metadata: Metadata = {
  title: "PWA Next | Dashboard",
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

console.log("Check data from data.json in user/page.tsx")
console.log(data);

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Component/>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  )
}

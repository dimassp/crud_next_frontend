import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { FormAddUser } from "@/components/forms/Forms";


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

export default function Page() {
  return (
    <>
      <SiteHeader title="User" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-8">
              <FormAddUser />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

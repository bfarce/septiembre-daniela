import { createFileRoute } from "@tanstack/react-router";
import LetterExperience from "@/components/letter/LetterExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Para Daniela — Una carta de Brahian" },
      { name: "description", content: "Una carta digital y un pequeño álbum de recuerdos para Daniela, de parte de Brahian." },
      { property: "og:title", content: "Para Daniela — Una carta de Brahian" },
      { property: "og:description", content: "Hay personas que hacen que los días sean un poquito más bonitos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LetterExperience,
});

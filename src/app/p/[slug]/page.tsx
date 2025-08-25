import { connectToDatabase } from "@/lib/db";
import { PageModel } from "@/models/Page";
import { notFound } from "next/navigation";

interface Page {
  title: string;
  content: string;
  slug: string;
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();

  // Await the params Promise
  const { slug } = await params;

  const page = await PageModel.findOne({ slug }).lean<Page>();
  if (!page) return notFound();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}

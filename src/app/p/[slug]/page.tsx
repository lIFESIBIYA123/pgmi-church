import { connectToDatabase } from "@/lib/db";
import { PageModel } from "@/models/Page";
import { notFound } from "next/navigation";

interface Props { params: { slug: string } }

export default async function DynamicPage({ params }: Props) {
	await connectToDatabase();
	const page = await PageModel.findOne({ slug: params.slug }).lean();
	if (!page) return notFound();

	// Type assertion to ensure page is a single document
	const pageDoc = page as any;

	return (
		<div className="container mx-auto px-4 sm:px-6 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold mb-6">{pageDoc.title}</h1>
			<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageDoc.content }} />
		</div>
	);
}



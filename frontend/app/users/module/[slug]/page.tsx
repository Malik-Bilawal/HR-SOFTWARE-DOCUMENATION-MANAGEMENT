import { notFound } from "next/navigation";

interface ModulePageProps {
  params: Promise<{ slug: string }>; // params is a Promise
}

async function getModule(slug: string) {
  const res = await fetch(`http://localhost:8000/api/modules/${slug}/`, {
    cache: "no-store", // or use revalidation in production
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ModulePage({ params }: ModulePageProps) {
  // Await the params promise to get the actual object
  const { slug } = await params;

  const module = await getModule(slug);
  if (!module) return notFound();

  return (
    <main className="bg-white">


      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: module.content }}
          />
        </div>
      </section>
    </main>
  );
}
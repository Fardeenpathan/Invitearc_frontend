import { getAvailableTemplates, templateMetadata } from "./discoverTemplates";
import Link from "next/link";
import TemplateGrid from "../../components/TemplateGrid"
export default function TemplatesPage() {
  const availableTemplates = getAvailableTemplates();

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Scalable Templates
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Browse our premium template collection
              </h1>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Explore all available templates or click on any template from the marketplace to preview and purchase.
          </p>
        </div>
        <TemplateGrid/>
      </section>
    </main>
  );
}

import config from "../../../config/config";
import HitchedTemplate from "../../templates/hindu-wedding/hitched/page";

const templateComponents = {
  hitched: HitchedTemplate,
};

export default async function SharePage({ params }) {
  const { slug } = await params;

  let template = null;
  let errorMessage = "Unable to load the shared template.";

  try {
    const response = await fetch(
      `${config.api.baseUrl}${config.api.endpoints.clientTemplates.share.replace(":slug", slug)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      errorMessage = result?.message || "Shared template not found.";
    } else {
      const result = await response.json();
      template = result?.data || null;
    }
  } catch (error) {
    console.error("SharePage fetch error:", error);
  }

  if (!template || !template.templateId) {
    return (
      <main className="bg-slate-50 min-h-screen text-slate-900">
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:px-12">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">
              Shared template unavailable
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {errorMessage}
            </p>
          </div>
        </section>
      </main>
    );
  }

  const TemplateComponent = template.templateId.slug
    ? templateComponents[template.templateId.slug]
    : null;

  return (
    <main className="min-h-screen">
      {TemplateComponent ? (
        <TemplateComponent
          data={template.customData || template.templateId.defaultData}
          isOwner={false}
        />
      ) : (
        <div className="p-10 text-center">Template component not found</div>
      )}
    </main>
  );
}

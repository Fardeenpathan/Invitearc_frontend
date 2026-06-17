import config from "../../../config/config";
import { getTemplateComponent } from "../../../app/templates/templateLoader";

export default async function SharePage({ params }) {
  const { slug } = await params;
  const response = await fetch(
    `${config.api.baseUrl}${config.api.endpoints.clientTemplates.share.replace(":slug", slug)}`,
    { cache: "no-store" },
  );
  const result = await response.json();
  const template = result.data;
  const TemplateComponent = template?.templateId?.slug
    ? getTemplateComponent(template.templateId.slug)
    : null;

  if (!template || !template.templateId) {
    return (
      <main className="bg-slate-50 min-h-screen text-slate-900">
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:px-12">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">
              Template not found
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This shared template either does not exist or has not been
              published yet.
            </p>
          </div>
        </section>
      </main>
    );
  }

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

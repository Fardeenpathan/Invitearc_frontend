import config from "../../../config/config";
import HitchedTemplate from "../../templates/hindu-wedding/hitched/page";

export const dynamic = "force-dynamic";

const templateComponents = {
  hitched: HitchedTemplate,
};

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL || "https://hitched-clientdemo.vercel.app";

const normalizeImageUrl = (imageUrl) => {
  if (!imageUrl) return `${getSiteUrl()}/og.jpg`;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return new URL(imageUrl, getSiteUrl()).toString();
};

async function fetchShareTemplate(slug) {
  try {
    const response = await fetch(
      `${config.api.baseUrl}${config.api.endpoints.clientTemplates.share.replace(":slug", slug)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      return {
        template: null,
        errorMessage: result?.message || "Shared template not found.",
      };
    }

    const result = await response.json();
    return {
      template: result?.data || null,
      errorMessage: null,
    };
  } catch (error) {
    console.error("SharePage fetch error:", error);
    return {
      template: null,
      errorMessage: "Unable to load the shared template.",
    };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { template } = await fetchShareTemplate(slug);

  if (!template || !template.templateId) {
    return {
      title: "InviteArc Invitation",
      description: "A beautiful invitation from InviteArc.",
    };
  }

  const previewImage =
    template.customData?.sharePreviewImage ||
    template.templateId?.previewImage ||
    template.templateId?.defaultData?.sharePreviewImage ||
    "/og.jpg";
  const previewTitle =
    template.customData?.sharePreviewTitle ||
    template.templateId?.title ||
    template.customData?.headline ||
    "Invitation Preview";
  const previewDescription =
    template.customData?.sharePreviewDescription ||
    template.customData?.inviteLine ||
    template.customData?.eventIntro ||
    "A beautiful invitation from InviteArc.";
  const canonicalUrl = `${getSiteUrl()}/share/${slug}`;
  const imageUrl = normalizeImageUrl(previewImage);

  return {
    title: previewTitle,
    description: previewDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: previewTitle,
      description: previewDescription,
      url: canonicalUrl,
      siteName: "InviteArc",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: previewTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: previewTitle,
      description: previewDescription,
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ params }) {
  const { slug } = await params;
  const { template, errorMessage } = await fetchShareTemplate(slug);

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

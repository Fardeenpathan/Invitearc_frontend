import dynamic from "next/dynamic";

// Dynamic template loader - maps slug to template component
const templateMap = {
  hitched: dynamic(() => import("./hindu-wedding/hitched/page"), { loading: () => <div>Loading...</div> }),
  // ./hindu-wedding/hitched/page.js
};

export function getAvailableTemplates() {
  return Object.keys(templateMap);
}

export function getTemplateComponent(slug) {
  return templateMap[slug] || null;
}

export const templateMetadata = {
  // hitched: {
  //   title: "Hitched",
  //   description: "A modern and elegant wedding invitation",
  //   category: "Wedding",
  //   indprice: 2999,
  //   usaprice: 39,
  //   paid: true,
  // },
};

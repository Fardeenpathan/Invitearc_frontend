import dynamic from "next/dynamic";
import { hitchedEditorFields } from "./hindu-wedding/hitched/fields";

// Dynamic template loader - maps slug to template component
const templateMap = {
  hitched: dynamic(() => import("./hindu-wedding/hitched/page"), { loading: () => <div>Loading...</div> }),
};

const templateFieldConfigs = {
  hitched: hitchedEditorFields,
};

export function getAvailableTemplates() {
  return Object.keys(templateMap);
}

export function getTemplateComponent(slug) {
  return templateMap[slug] || null;
}

export function getTemplateFieldConfig(slug) {
  return templateFieldConfigs[slug] || null;
}

export const templateComponents = templateMap;
export const templateFields = templateFieldConfigs;

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

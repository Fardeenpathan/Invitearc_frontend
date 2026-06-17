import fs from 'fs';
import path from 'path';

const templatesDir = path.join(process.cwd(), 'src', 'app', 'templates');

function hasPageFile(dir) {
  return ['page.jsx', 'page.tsx', 'page.js'].some((f) => fs.existsSync(path.join(dir, f)));
}

export function getAvailableTemplates() {
  const slugs = new Set();
  if (!fs.existsSync(templatesDir)) return [];

  const entries = fs.readdirSync(templatesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const name = entry.name;
      if (name === '[slug]') continue;
      const dirPath = path.join(templatesDir, name);
      if (hasPageFile(dirPath)) slugs.add(name);

      // also check one-level nested folders (e.g., wedding/hitched)
      try {
        const sub = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const s of sub) {
          if (s.isDirectory() && !s.name.startsWith('[')) {
            const subDir = path.join(dirPath, s.name);
            if (hasPageFile(subDir)) slugs.add(s.name);
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }

  return Array.from(slugs).sort();
}

// Minimal metadata defaults; you can expand this mapping for nicer titles/descriptions
export const templateMetadata = {
  
  hitched: {
    title: 'Hitched',
    description: 'A modern and elegant wedding invitation',
    category: 'Wedding',
    indprice: 3999,
    usaprice: 39,
    paid: true,
  },
};

// Add discovered templates to metadata with defaults
const discovered = getAvailableTemplates();
for (const slug of discovered) {
  if (!templateMetadata[slug]) {
    templateMetadata[slug] = {
      title: slug.replace(/-/g, ' ').replace(/(^|\s)\S/g, (c) => c.toUpperCase()),
      description: '',
      category: '',
    };
  }
}

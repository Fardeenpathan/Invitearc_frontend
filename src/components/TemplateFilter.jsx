"use client";

export default function TemplateFilter({ selectedCategory, onCategoryChange, categories }) {
  return (
    <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Filter
          </p>
          <p className="mt-2 text-sm text-slate-600">Browse templates by category</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedCategory === ""
                ? "bg-[#861E1D] text-white"
                : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100"
            }`}
          >
            All Templates
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-[#861E1D] text-white"
                  : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

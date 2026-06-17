// "use client";

// import { useContext, useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import config from "../../config/config";
// import { AuthContext } from "../../context/AuthContext";
// import AuthModal from "../../components/AuthModal";
// import TemplateFilter from "../../components/TemplateFilter";

// export default function TemplatePage() {
//   const [templates, setTemplates] = useState([]);
//   const [filteredTemplates, setFilteredTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [authModalOpen, setAuthModalOpen] = useState(false);
//   const [authTab, setAuthTab] = useState("login");
//   const [pendingPurchase, setPendingPurchase] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const { user, token } = useContext(AuthContext);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirect") || "/dashboard";

//   // Extract unique categories from templates
//   const categories = [...new Set(templates.map((t) => t.category).filter(Boolean))];

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await axios.get(
//           `${config.api.baseUrl}${config.api.endpoints.templates.all}`,
//         );
//         setTemplates(response.data.data || []);
//         setFilteredTemplates(response.data.data || []);
//       } catch (err) {
//         setError("Unable to load templates. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   // Filter templates when category changes
//   useEffect(() => {
//     if (selectedCategory === "") {
//       setFilteredTemplates(templates);
//     } else {
//       setFilteredTemplates(templates.filter((t) => t.category === selectedCategory));
//     }
//   }, [selectedCategory, templates]);

//   const openAuthModal = (tab) => {
//     setAuthTab(tab);
//     setAuthModalOpen(true);
//   };

//   const buyTemplate = async (templateId) => {
//     if (!user) {
//       setPendingPurchase(templateId);
//       openAuthModal("login");
//       return;
//     }

//     router.push(`/payment?templateId=${templateId}`);
//   };

//   const handleAuthSuccess = () => {
//     if (pendingPurchase) {
//       const templateId = pendingPurchase;
//       setPendingPurchase(null);
//       router.push(`/payment?templateId=${templateId}`);
//     }
//   };

//   return (
//     <main className="bg-slate-50 min-h-screen text-slate-900">
//       <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
//         <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
//                 Templates
//               </p>
//               <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
//                 Choose your template and purchase to start editing.
//               </h1>
//             </div>
//             <div className="rounded-3xl bg-[#861E1D] px-4 py-3 text-sm font-semibold text-white">
//               {user ? (
//                 `Logged in as ${user.name}`
//               ) : (
//                 <div className="flex flex-wrap items-center gap-2">
//                   <span>Login to purchase templates</span>
//                   <button
//                     type="button"
//                     onClick={() => openAuthModal("login")}
//                     className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
//                   >
//                     Login
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => openAuthModal("register")}
//                     className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-100"
//                   >
//                     Register
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//           <p className="text-sm leading-6 text-slate-600">
//             Each template includes a preview, price, and a fast checkout flow to add it to your dashboard.
//           </p>
//           {error && <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</div>}
//         </div>

//         <TemplateFilter
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//           categories={categories}
//         />

//         <div className="grid gap-6 md:grid-cols-3">
//           {loading
//             ? Array.from({ length: 3 }).map((_, index) => (
//                 <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6" />
//               ))
//             : filteredTemplates.length > 0
//             ? filteredTemplates.map((template) => (
//                 <article
//                   key={template._id}
//                   className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//                 >
//                   <div className="overflow-hidden rounded-3xl bg-slate-100">
//                     <img
//                       src={template.previewImage || "/placeholder-template.jpg"}
//                       alt={template.title}
//                       className="h-48 w-full object-cover"
//                     />
//                   </div>
//                   <div className="mt-5 space-y-4">
//                     <div>
//                       <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{template.category || "Template"}</p>
//                       <h2 className="mt-3 text-xl font-semibold text-slate-900">{template.title}</h2>
//                       <p className="mt-3 text-sm leading-6 text-slate-600">
//                         {template.defaultData?.description || "A ready-made template with editable text areas and a modern layout."}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-between gap-4">
//                       <span className="text-xl font-semibold text-slate-900">
//                         {template.indprice != null ? `₹ ${template.indprice}` : template.usaprice != null ? `$ ${template.usaprice}` : "Free"}
//                       </span>
//                       <div className="flex flex-wrap items-center gap-3">
//                         <Link
//                           href={`/template/demo?templateId=${template._id}`}
//                           className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
//                         >
//                           Demo
//                         </Link>
//                         <button
//                           onClick={() => buyTemplate(template._id)}
//                           className="rounded-full bg-[#861E1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 cursor-pointer"
//                         >
//                           Buy Now
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               ))
//             : (
//               <div className="col-span-3 rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
//                 No templates found in this category. Try selecting a different filter.
//               </div>
//             )}
//         </div>
//       </section>

//       <AuthModal
//         open={authModalOpen}
//         initialTab={authTab}
//         onClose={() => setAuthModalOpen(false)}
//         onSuccess={handleAuthSuccess}
//       />
//     </main>
//   );
// }
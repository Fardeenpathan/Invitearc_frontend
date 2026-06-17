"use client";

import { useEffect, useMemo, useState, useContext  } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import config from "../../../config/config";
import { AuthContext } from "../../../context/AuthContext";
import {
  getTemplateComponent,
  templateMetadata,
} from "../../templates/templateLoader";
export default function TemplateDemoPage() {
   const { user, token, openAuthModal } = useContext(AuthContext);
  const [view, setView] = useState("desktop");
  const params = useParams();
  const slug = params.slug;
  const [resolvedSlug, setResolvedSlug] = useState(null);
  const [remoteTemplate, setRemoteTemplate] = useState(null);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [country, setCountry] = useState("IN");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
  const fetchCountry = async () => {
    try {
      const res = await fetch("/api/country");
      const data = await res.json();
      setCountry(data.country || "IN");
    } catch {
      setCountry("IN");
    }
  };

  fetchCountry();
}, []);

  useEffect(() => {
    if (!slug) return;
 

    const fetchTemplate = async () => {
      setLoadingTemplate(true);
      setFetchError("");

      try {
        const response = await axios.get(
          `${config.api.baseUrl}${config.api.endpoints.templates.all}`,
        );
        const templates = response.data?.data || [];

        const found = templates.find((item) => item.slug === slug);

        if (found) {
          console.log("Found template:", found);

          // fallback slug mapping
          const fallbackSlug =
            found.componentKey ||
            found.slug ||
            found.templateSlug ||
            found.category?.toLowerCase() ||
            "wedding";

          setResolvedSlug(fallbackSlug);
          setRemoteTemplate(found);
        } else {
          setFetchError("Demo template data is not available.");
          setRemoteTemplate(null);
          setResolvedSlug(null);
        }
      } catch (error) {
        setFetchError("Unable to load demo template data.");
      } finally {
        setLoadingTemplate(false);
      }
    };

    fetchTemplate();
  }, [slug]);

  // const slugToLoad = templateMetadata[slug] ? slug : resolvedSlug;
  const slugToLoad = resolvedSlug || slug;
  const template = useMemo(() => {
    // const meta = slugToLoad ? templateMetadata[slugToLoad] : null;
    // if (meta) return meta;
    if (remoteTemplate) {
      return {
         _id: remoteTemplate._id,
        title: remoteTemplate.title,
        description:
          remoteTemplate.defaultData?.description ||
          remoteTemplate.description ||
          "This demo showcases the template layout and editable content.",
        category: remoteTemplate.category || "Wedding",
        indprice: remoteTemplate.indprice,
        usaprice: remoteTemplate.usaprice,
      };
    }
    return null;
  }, [slugToLoad, remoteTemplate]);

  const TemplateComponent = slugToLoad
    ? getTemplateComponent(slugToLoad)
    : null;

  const hasTemplate = Boolean(slug && template);

const priceLabel =
  country === "IN"
    ? `₹ ${template?.indprice || 0}`
    : `$${template?.usaprice || 0}`;

     useEffect(() => {
    const pendingTemplate = localStorage.getItem("pendingTemplate");

    if (user && pendingTemplate) {
      const template = JSON.parse(pendingTemplate);

      localStorage.removeItem("pendingTemplate");

      handlePayment(template);
    }
  }, [user]);

 
const handlePayment = async (template) => {
    if (!user) {
      localStorage.setItem("pendingTemplate", JSON.stringify(template));

      openAuthModal("login");
      return;
    }

    try {
      const response = await axios.post(
        `${config.api.baseUrl}/api/client-templates/create-order`,

        {
          templateId: template._id,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      const orderData = response.data?.data;

      if (!orderData) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,

        name: "InviteArc",
        description: `${template.title} Template`,

         image: `${window.location.origin}/logo.png`,

        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await axios.post(
              `${config.api.baseUrl}/api/client-templates/verify-payment`,
              {
                razorpayOrderId: paymentResponse.razorpay_order_id,

                razorpayPaymentId: paymentResponse.razorpay_payment_id,

                razorpaySignature: paymentResponse.razorpay_signature,

                templateId: template._id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              },
            );

            if (verifyResponse.data.success) {
              alert("Payment Successful");

              window.location.href = "/dashboard";
            }
          } catch (error) {
            console.error(error);

            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#0f172a",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to initiate payment");
    }
  };


  const previewWidth =
    view === "mobile" ? 375 : view === "tablet" ? 900 : "100%";
  const previewLabel =
    view === "mobile" ? "Mobile" : view === "tablet" ? "Tablet" : "Desktop";
  return (
    <main className="bg-slate-50 min-h-screen relative">
      {hasTemplate && (
        <button
          onClick={() => handlePayment(remoteTemplate)}
          className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold transition flex items-center gap-3 border-white border-2 bg-white/0 backdrop-blur text-white px-6 py-3 rounded-full shadow-lg cursor-pointer" >
          Buy Now {priceLabel}
        </button>
      )}

      {!slug ? (
        <div className="rounded-3xl bg-rose-50 p-6 text-sm text-rose-700">
          Demo template not found.
        </div>
      ) : loadingTemplate ? (
        <div className="animate-pulse space-y-4">
          <div className="h-72 rounded-3xl bg-slate-200" />
          <div className="h-6 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
        </div>
      ) : fetchError ? (
        <div className="rounded-3xl bg-rose-50 p-6 text-sm text-rose-700">
          {fetchError}
        </div>
      ) : !hasTemplate ? (
        <div className="rounded-3xl bg-rose-50 p-6 text-sm text-rose-700">
          Demo template data is not available.
        </div>
      ) : (
        <div className="space-y-8 flex flex-col-1 gap-6">
          <div className="space-y-4 w-full">
            <div
              className="mx-auto overflow-hidden"
              style={{ width: previewWidth, minWidth: 0 }}
            >
              <div className="overflow-y-auto overflow-x-hidden bg-slate-100">
                {TemplateComponent ? (
                  <TemplateComponent />
                ) : (
                  <div className="p-10 text-center text-slate-600">
                    Template preview not available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

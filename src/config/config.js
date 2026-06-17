const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    endpoints: {
      auth: {
        register: "/api/auth/register",
        login: "/api/auth/login",
        me: "/api/auth/get-me",
        refresh: "/api/auth/refreshToken",
        logout: "/api/auth/logout",
      },
      templates: {
        all: "/api/template/all",
        create: "/api/template/create",
      },
      clientTemplates: {
        buy: "/api/client-templates/buy-template",
        createOrder: "/api/client-templates/create-order",
        verifyPayment: "/api/client-templates/verify-payment",
        myTemplates: "/api/client-templates/my-templates",
        share: "/api/client-templates/share/:slug",
      },
    },
  },
};

export default config;

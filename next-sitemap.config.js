/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://woodfrog.tech",
  generateRobotsTxt: true,

  exclude: [
    "/admin/*",
    "/admin/**",
    "/login",
    "/dashboard",
  ],

  transform: async (config, path) => {
    // Default priority
    let priority = 0.7;

    // Homepage priority
    if (path === "/") {
      priority = 1.0;
    }

    // Important pages priority
    const importantPages = [
      "/about",
      "/ai-agents",
      "/ai-governance",
      "/applications-and-automations",
      "/data-agents",
      "/data-engineering",
      "/data-visualization",
      "/products",
      "/superset-analytics",
    ];

    if (importantPages.includes(path)) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*"],
      },
    ],
  },
};

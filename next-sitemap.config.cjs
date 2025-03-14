const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://mudrjanulova.cz'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/aktuality-sitemap.xml',
    '/aktuality-pages-sitemap.xml',
    '/pages-sitemap.xml',
    '/admin/*',
    '/api/*',
    '/_next/*',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/_next/*', '/api/*'],
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/aktuality-sitemap.xml`,
      `${SITE_URL}/aktuality-pages-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom transform function for sitemap entries
    // Customize priority based on path
    let priority = config.priority

    // Home page gets highest priority
    if (path === '/') {
      priority = 1.0
    }
    // Aktuality aktuality get medium priority
    else if (path.startsWith('/aktuality/')) {
      priority = 0.8
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}

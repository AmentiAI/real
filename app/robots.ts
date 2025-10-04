import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/clients/', '/_next/', '/checkout/', '/payment/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/clients/', '/_next/', '/checkout/', '/payment/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/clients/', '/_next/', '/checkout/', '/payment/'],
      },
    ],
    sitemap: 'https://amentiai.com/sitemap.xml',
    host: 'https://amentiai.com',
  }
}
import SEOMeta from '@/components/SEOMeta'

export default function SEOExamplePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SEO Example Page - Amenti AI",
    "description": "Example page showing comprehensive SEO implementation",
    "url": "https://amentiai.com/seo-example",
    "publisher": {
      "@type": "Organization",
      "name": "Amenti AI",
      "url": "https://amentiai.com"
    }
  }

  return (
    <>
      <SEOMeta
        title="SEO Example Page - Amenti AI Digital Marketing"
        description="Learn how to implement comprehensive SEO for your website with Amenti AI's proven strategies and techniques."
        keywords="SEO example, digital marketing SEO, Rhode Island SEO services"
        canonical="https://amentiai.com/seo-example"
        ogTitle="SEO Example Page - Amenti AI Digital Marketing"
        ogDescription="Learn how to implement comprehensive SEO for your website with Amenti AI's proven strategies."
        ogImage="https://amentiai.com/images/seo-example.jpg"
        ogType="article"
        twitterCard="summary_large_image"
        twitterTitle="SEO Example Page - Amenti AI Digital Marketing"
        twitterDescription="Learn how to implement comprehensive SEO for your website with Amenti AI's proven strategies."
        twitterImage="https://amentiai.com/images/seo-example.jpg"
        robotsIndex={true}
        robotsFollow={true}
        structuredData={JSON.stringify(structuredData)}
      />
      
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            SEO Implementation Example
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            This page demonstrates how to use the comprehensive SEO meta tags system.
          </p>
          
          <div className="prose prose-lg max-w-none">
            <h2>SEO Features Implemented</h2>
            <ul>
              <li>✅ Meta title and description</li>
              <li>✅ Keywords meta tag</li>
              <li>✅ Canonical URL</li>
              <li>✅ Open Graph tags (Facebook)</li>
              <li>✅ Twitter Card tags</li>
              <li>✅ Robots meta tag</li>
              <li>✅ Structured data (JSON-LD)</li>
            </ul>
            
            <h2>How to Use SEOMeta Component</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`import SEOMeta from '@/components/SEOMeta'

export default function MyPage() {
  return (
    <>
      <SEOMeta
        title="Your Page Title"
        description="Your page description"
        keywords="keyword1, keyword2, keyword3"
        canonical="https://yoursite.com/page"
        ogTitle="Your Open Graph Title"
        ogDescription="Your Open Graph Description"
        ogImage="https://yoursite.com/image.jpg"
        structuredData={JSON.stringify(yourSchemaData)}
      />
      
      <main>
        {/* Your page content */}
      </main>
    </>
  )
}`}
            </pre>
          </div>
        </div>
      </main>
    </>
  )
}










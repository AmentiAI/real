import { Metadata } from 'next'
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Sparkles, Eye, TrendingUp, Zap, CheckCircle, Target, Award } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // This would normally fetch from database
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://amentiai.com'
  const canonicalUrl = `${baseUrl}/blog/${params.slug}`
  const ogImage = post.featured_image || `${baseUrl}/images/blog-default.jpg`

  return {
    title: `${post.title} | Amenti AI Blog`,
    description: post.excerpt,
    keywords: post.keywords || 'digital marketing, SEO, business growth',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | Amenti AI Blog`,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'Amenti AI',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Amenti AI Blog`,
      description: post.excerpt,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

function getBlogPost(slug: string) {
  // This would normally fetch from database
  const posts = [
    {
      id: 1,
      title: '10 Essential SEO Strategies for Rhode Island Businesses in 2024',
      slug: 'essential-seo-strategies-rhode-island-2024',
      excerpt: 'Discover the most effective SEO strategies that are helping Rhode Island businesses dominate local search results and drive more qualified traffic.',
      content: `
        <p>As we move through 2024, Rhode Island businesses are facing increasing competition in the digital landscape. With over 15,000 businesses competing for visibility in Providence alone, having a strong SEO strategy is no longer optional—it's essential for survival and growth.</p>

        <h2>1. Local SEO Optimization</h2>
        <p>For Rhode Island businesses, local SEO should be your top priority. With 78% of local searches resulting in offline purchases, optimizing for local search can significantly impact your bottom line.</p>
        
        <h3>Key Local SEO Strategies:</h3>
        <ul>
          <li><strong>Google Business Profile Optimization:</strong> Ensure your profile is complete with accurate business information, photos, and regular posts.</li>
          <li><strong>Local Citations:</strong> Get listed in local directories like Yelp, Yellow Pages, and Rhode Island-specific directories.</li>
          <li><strong>Local Keywords:</strong> Target location-specific keywords like "roofing company Providence RI" or "lawyer in Warwick RI."</li>
          <li><strong>Local Content:</strong> Create content that speaks to Rhode Island residents and businesses.</li>
        </ul>

        <h2>2. Technical SEO Foundation</h2>
        <p>Technical SEO forms the foundation of all other SEO efforts. Without a solid technical foundation, your content and local SEO efforts won't reach their full potential.</p>

        <h3>Essential Technical SEO Elements:</h3>
        <ul>
          <li><strong>Site Speed:</strong> Aim for Core Web Vitals scores in the green. Rhode Island users expect fast-loading websites.</li>
          <li><strong>Mobile Optimization:</strong> With 65% of searches happening on mobile, your site must be mobile-friendly.</li>
          <li><strong>SSL Certificate:</strong> Secure your website with HTTPS to improve rankings and user trust.</li>
          <li><strong>XML Sitemap:</strong> Help search engines understand your site structure.</li>
        </ul>

        <h2>3. Content Marketing Strategy</h2>
        <p>Content marketing remains one of the most effective ways to improve SEO rankings while providing value to your audience. For Rhode Island businesses, this means creating content that resonates with local customers.</p>

        <h3>Content Ideas for Rhode Island Businesses:</h3>
        <ul>
          <li>Local event coverage and participation</li>
          <li>Industry insights relevant to the Rhode Island market</li>
          <li>Customer success stories from local businesses</li>
          <li>Seasonal content (like preparing for New England winters)</li>
          <li>Local business spotlights and partnerships</li>
        </ul>

        <h2>4. Link Building for Authority</h2>
        <p>Building high-quality backlinks is crucial for establishing domain authority and improving search rankings. Focus on earning links from reputable sources rather than buying them.</p>

        <h3>Effective Link Building Strategies:</h3>
        <ul>
          <li><strong>Local Partnerships:</strong> Partner with other Rhode Island businesses for mutual link exchanges.</li>
          <li><strong>Industry Publications:</strong> Get featured in Rhode Island business publications and industry journals.</li>
          <li><strong>Community Involvement:</strong> Sponsor local events and get mentioned in event coverage.</li>
          <li><strong>Resource Pages:</strong> Create valuable resources that other websites want to link to.</li>
        </ul>

        <h2>5. User Experience Optimization</h2>
        <p>Search engines increasingly prioritize user experience signals. A website that provides an excellent user experience will naturally rank higher in search results.</p>

        <h3>UX Elements to Focus On:</h3>
        <ul>
          <li><strong>Navigation:</strong> Make it easy for users to find what they're looking for.</li>
          <li><strong>Page Layout:</strong> Use clear headings, bullet points, and white space to improve readability.</li>
          <li><strong>Call-to-Actions:</strong> Guide users toward desired actions with clear CTAs.</li>
          <li><strong>Contact Information:</strong> Make it easy for Rhode Island customers to contact you.</li>
        </ul>

        <h2>6. Voice Search Optimization</h2>
        <p>With the growing popularity of voice assistants, optimizing for voice search is becoming increasingly important. Voice searches tend to be more conversational and question-based.</p>

        <h3>Voice Search Optimization Tips:</h3>
        <ul>
          <li>Target long-tail, conversational keywords</li>
          <li>Answer common questions in your content</li>
          <li>Use natural language in your content</li>
          <li>Optimize for "near me" searches</li>
        </ul>

        <h2>7. Analytics and Performance Tracking</h2>
        <p>You can't improve what you don't measure. Regular monitoring of your SEO performance is essential for understanding what's working and what needs adjustment.</p>

        <h3>Key Metrics to Track:</h3>
        <ul>
          <li>Organic traffic growth</li>
          <li>Keyword rankings for target terms</li>
          <li>Local search visibility</li>
          <li>Conversion rates from organic traffic</li>
          <li>Core Web Vitals scores</li>
        </ul>

        <h2>8. Social Media Integration</h2>
        <p>While social media doesn't directly impact SEO rankings, it can significantly boost your content's reach and drive traffic to your website.</p>

        <h3>Social Media SEO Benefits:</h3>
        <ul>
          <li>Increased content visibility and engagement</li>
          <li>More opportunities for backlinks</li>
          <li>Brand awareness and recognition</li>
          <li>Direct traffic to your website</li>
        </ul>

        <h2>9. Schema Markup Implementation</h2>
        <p>Schema markup helps search engines understand your content better and can result in rich snippets in search results, improving click-through rates.</p>

        <h3>Schema Types for Rhode Island Businesses:</h3>
        <ul>
          <li>LocalBusiness schema for brick-and-mortar locations</li>
          <li>Service schema for your business services</li>
          <li>Review schema for customer testimonials</li>
          <li>Event schema for local events and workshops</li>
        </ul>

        <h2>10. Competitive Analysis and Adaptation</h2>
        <p>Understanding your competition is crucial for developing effective SEO strategies. Regularly analyze what your competitors are doing and adapt your approach accordingly.</p>

        <h3>Competitive Analysis Areas:</h3>
        <ul>
          <li>Keyword rankings and content strategies</li>
          <li>Backlink profiles and link building tactics</li>
          <li>Local SEO optimization levels</li>
          <li>Content gaps and opportunities</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Implementing these 10 SEO strategies will help your Rhode Island business improve its online visibility and attract more qualified customers. Remember, SEO is a long-term strategy that requires consistent effort and adaptation to changing search engine algorithms.</p>

        <p>Start with the strategies that align best with your current resources and business goals, then gradually implement additional tactics. With patience and persistence, you'll see significant improvements in your search rankings and business growth.</p>

        <p>Ready to implement these strategies for your Rhode Island business? <a href="/contact">Contact Amenti AI</a> for a free SEO audit and consultation.</p>
      `,
      author: 'Sarah Chen',
      published_at: '2024-01-15',
      read_time: '8 min read',
      category: 'SEO',
      keywords: 'SEO strategies, Rhode Island SEO, local SEO, digital marketing, Providence SEO',
      featured_image: '/images/blog/seo-strategies.jpg'
    }
  ]
  
  return posts.find(post => post.slug === slug)
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Navigation */}
      <div className="pt-24 pb-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <Link 
            href="/blog" 
            className="group inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-all duration-300 hover:scale-105 transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Enhanced Article Header */}
      <article className="pb-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <header className="mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              {post.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-8 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-8">
              <div className="flex items-center text-slate-500 space-x-6">
                <div className="flex items-center group">
                  <User className="w-5 h-5 mr-2 group-hover:text-blue-600 transition-colors duration-200" />
                  <span className="group-hover:text-slate-700 transition-colors duration-200 font-semibold">{post.author}</span>
                </div>
                <div className="flex items-center group">
                  <Calendar className="w-5 h-5 mr-2 group-hover:text-purple-600 transition-colors duration-200" />
                  <span className="group-hover:text-slate-700 transition-colors duration-200">{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center group">
                  <Clock className="w-5 h-5 mr-2 group-hover:text-green-600 transition-colors duration-200" />
                  <span className="group-hover:text-slate-700 transition-colors duration-200">{post.read_time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="group flex items-center text-slate-500 hover:text-blue-600 transition-all duration-300 hover:scale-105 transform">
                  <Bookmark className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Save
                </button>
                <button className="group flex items-center text-slate-500 hover:text-purple-600 transition-all duration-300 hover:scale-105 transform">
                  <Share2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Share
                </button>
              </div>
            </div>
          </header>

          {/* Article Image */}
          <div className="mb-12">
            <div className="bg-slate-200 rounded-2xl h-64 md:h-96 flex items-center justify-center">
              <span className="text-slate-500">Featured Image</span>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          <div className="mt-16 p-8 bg-slate-50 rounded-2xl">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-blue-600 rounded-full mr-6 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  About {post.author}
                </h3>
                <p className="text-slate-600">
                  Sarah Chen is the Head of SEO at Amenti AI with over 8 years of experience in search engine optimization. 
                  She specializes in local SEO strategies and has helped hundreds of Rhode Island businesses improve their 
                  online visibility and attract more qualified leads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">
            Related Articles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-200 h-48 flex items-center justify-center">
                <span className="text-slate-500">Article Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  How to Choose the Right Digital Marketing Agency
                </h3>
                <p className="text-slate-600 mb-4">
                  Learn the key factors to consider when selecting a digital marketing agency.
                </p>
                <Link href="/blog/choose-right-digital-marketing-agency" className="text-blue-600 font-medium">
                  Read More →
                </Link>
              </div>
            </article>
            
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-200 h-48 flex items-center justify-center">
                <span className="text-slate-500">Article Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  The Complete Guide to Local SEO for Providence
                </h3>
                <p className="text-slate-600 mb-4">
                  Everything you need to know about local SEO for Providence businesses.
                </p>
                <Link href="/blog/complete-guide-local-seo-providence" className="text-blue-600 font-medium">
                  Read More →
                </Link>
              </div>
            </article>
            
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-200 h-48 flex items-center justify-center">
                <span className="text-slate-500">Article Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Website Design Trends That Convert in 2024
                </h3>
                <p className="text-slate-600 mb-4">
                  Explore the latest website design trends that increase conversions.
                </p>
                <Link href="/blog/website-design-trends-2024" className="text-blue-600 font-medium">
                  Read More →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Ready to Implement These SEO Strategies?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a free SEO audit and discover how we can help your Rhode Island business grow online.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get Free SEO Audit
          </Link>
        </div>
      </section>
    </main>
  )
}







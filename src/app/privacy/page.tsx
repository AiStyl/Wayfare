import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-midnight-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-midnight-500">
              Last updated: December 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl border border-midnight-100 p-8 md:p-12 space-y-8">
              
              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Introduction
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  WAYFARE (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our travel intelligence platform and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Information We Collect
                </h2>
                <p className="text-midnight-600 leading-relaxed mb-4">
                  We collect information that you provide directly to us when using our services:
                </p>
                <ul className="list-disc list-inside text-midnight-600 space-y-2">
                  <li>Search queries and travel preferences (destinations, dates, budgets)</li>
                  <li>Email address if you sign up for price alerts or newsletters</li>
                  <li>Device information and browser type for analytics</li>
                  <li>Usage data to improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-midnight-600 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-midnight-600 space-y-2">
                  <li>Provide and improve our travel tools and services</li>
                  <li>Send price alerts and notifications you&apos;ve requested</li>
                  <li>Personalize your experience with relevant recommendations</li>
                  <li>Analyze usage patterns to enhance our platform</li>
                  <li>Communicate about updates and new features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Data Sharing and Third Parties
                </h2>
                <p className="text-midnight-600 leading-relaxed mb-4">
                  We do not sell your personal information. We may share data with:
                </p>
                <ul className="list-disc list-inside text-midnight-600 space-y-2">
                  <li>Travel partners (airlines, hotels, booking sites) when you choose to book</li>
                  <li>Analytics providers to understand platform usage</li>
                  <li>Service providers who help operate our platform</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Affiliate Disclosures
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  WAYFARE participates in affiliate programs with travel booking sites, credit card issuers, and insurance providers. When you click through to partner sites and make purchases, we may earn a commission at no additional cost to you. This helps us keep WAYFARE free for all users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Data Security
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Cookies and Tracking
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze trends, and administer our website. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Your Rights
                </h2>
                <p className="text-midnight-600 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-midnight-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Contact Us
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at{' '}
                  <a href="mailto:hello@wayfare.com" className="text-coral-500 hover:text-coral-600">
                    hello@wayfare.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

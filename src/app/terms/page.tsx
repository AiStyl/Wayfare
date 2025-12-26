import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-midnight-900 mb-4">
              Terms of Service
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
                  Acceptance of Terms
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  By accessing or using WAYFARE (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Description of Service
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  WAYFARE is a travel intelligence platform that provides tools for comparing flights, hotels, car rentals, travel insurance, and other travel-related services. We aggregate information from third-party sources to help you make informed travel decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Information Accuracy
                </h2>
                <p className="text-midnight-600 leading-relaxed mb-4">
                  We strive to provide accurate and up-to-date information, but we cannot guarantee the accuracy, completeness, or reliability of any information displayed on WAYFARE. Travel prices, availability, and policies change frequently.
                </p>
                <ul className="list-disc list-inside text-midnight-600 space-y-2">
                  <li>Prices shown are estimates and may differ from actual booking prices</li>
                  <li>Availability is subject to change without notice</li>
                  <li>Policies (cancellation, baggage, etc.) should be verified with providers</li>
                  <li>AI-generated recommendations are for informational purposes only</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Third-Party Services
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  WAYFARE links to and displays information from third-party travel providers. When you click through to book with these providers, you are subject to their terms and conditions. WAYFARE is not responsible for the products, services, or content provided by third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Affiliate Relationships
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  WAYFARE earns commissions from affiliate relationships with travel providers, credit card companies, and insurance providers. These relationships may influence which products are displayed or recommended, though we strive to present options objectively.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  User Conduct
                </h2>
                <p className="text-midnight-600 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-midnight-600 space-y-2">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Scrape, crawl, or use automated tools to extract data</li>
                  <li>Interfere with the proper functioning of the Service</li>
                  <li>Impersonate any person or entity</li>
                  <li>Use the Service to transmit malware or harmful code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Intellectual Property
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  All content on WAYFARE, including text, graphics, logos, and software, is the property of WAYFARE or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Disclaimer of Warranties
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WAYFARE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR TRAVEL EXPENSES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Travel Advice Disclaimer
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  Information provided by WAYFARE, including AI-generated recommendations, should not be considered professional travel advice. Users should verify all information independently and consult official sources for visa requirements, health advisories, and travel safety.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Modifications to Terms
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Service constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Governing Law
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-midnight-600 leading-relaxed">
                  For questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:hello@wayfare.com" className="text-coral-500 hover:text-coral-600">
                    hello@wayfare.com
                  </a>.
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

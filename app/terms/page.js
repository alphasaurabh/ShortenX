import { headers } from "next/headers";
import { getOriginFromHeaders } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function TermsPage() {
  const baseUrl = getOriginFromHeaders(headers());

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-700">
          <div className="flex items-start justify-between mb-6 gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Terms and Conditions</h1>
              <p className="text-sm text-slate-400 mt-1">Last updated: November 18, 2025</p>
            </div>
            <div className="hidden md:block text-right text-sm">
              <p className="text-slate-300">Service:</p>
              <p className="text-sky-300 font-medium">{baseUrl.replace(/^https?:\/\//, "")}</p>
            </div>
          </div>

          <div className="prose prose-invert lg:prose-lg max-w-none leading-relaxed">
            <p>
              Welcome to <strong>ShortenX</strong>. By accessing or using our website at <code>{baseUrl}</code>, you agree to
              these Terms and Conditions. If you disagree with any part of these terms, you should not use the service.
            </p>

            <h2>1. Description of Service</h2>
            <p>
              ShortenX provides a URL shortening service that lets users convert long URLs into short links and generate QR
              codes for those links.
            </p>
            <p>The service is provided "as is" and "as available" without any warranties, expressed or implied.</p>

            <h2>2. Acceptable Use</h2>
            <p>
              You agree to use ShortenX only for lawful purposes. You must not use the service to shorten URLs that direct to
              malicious, illegal, abusive, spam, hate speech, harassment, or adult content.
            </p>
            <p>
              ShortenX reserves the right to disable or delete any link that violates this policy without prior notice.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              The source code, design, logos, and features of ShortenX remain the property of the ShortenX development team.
              You retain ownership of the original URLs you submit.
            </p>

            <h2>4. Link Availability</h2>
            <p>
              We do not guarantee that links generated via ShortenX will exist forever. We may remove links, modify the service,
              or limit requests at any time to protect the platform.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              Our service redirects users to third-party websites. ShortenX does not control and is not responsible for the
              content, privacy policies, or practices of those websites.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, ShortenX and its developers are not liable for any direct, indirect,
              incidental, special, or consequential damages resulting from the use or inability to use the service.
            </p>

            <h2>7. Privacy</h2>
            <p>
              We collect basic data such as your IP address and timestamps of link creation and clicks for analytics and security
              purposes. We do not sell your personal data to third parties.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India, without regard to conflict of law provisions.
            </p>

            <h2>9. Changes to These Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the service after changes are posted means you accept the
              updated Terms.
            </p>

            <h2>10. Contact</h2>
            <p>If you have any questions, contact us at:</p>
            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a className="text-sky-300 underline" href="mailto:chandravanshisaurabh25@gmail.com">
                  chandravanshisaurabh25@gmail.com
                </a>
              </li>
              <li>
                <strong>GitHub:</strong>{" "}
                <a className="text-sky-300 underline" href="https://github.com/alphasaurabh" target="_blank" rel="noopener noreferrer">
                  github.com/alphasaurabh
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  FileText,
  Scale,
  AlertCircle,
  CheckCircle,
  Shield,
  User,
  CreditCard,
  Globe,
  Mail,
  Clock,
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Garments Tracker</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <PageHeader
              title={'Terms of Service'}
              highlight={'Service'}
              subtitle={`Please read these terms carefully before using our services`}
              icon={Scale}
              iconSize={70}
            ></PageHeader>
          </div>

          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
              Legal Agreement
            </span>
            <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
              User Responsibilities
            </span>
            <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
              Service Terms
            </span>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-700" />
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a
                href="#acceptance"
                className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg text-center transition"
              >
                <div className="font-medium text-gray-700">Acceptance</div>
              </a>
              <a
                href="#accounts"
                className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg text-center transition"
              >
                <div className="font-medium text-gray-700">User Accounts</div>
              </a>
              <a
                href="#services"
                className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg text-center transition"
              >
                <div className="font-medium text-gray-700">Our Services</div>
              </a>
              <a
                href="#payments"
                className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg text-center transition"
              >
                <div className="font-medium text-gray-700">Payments</div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto">
          {/* Acceptance of Terms */}
          <motion.section
            id="acceptance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-teal-700" />
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                By accessing and using Garments Tracker ("the Service"), you
                accept and agree to be bound by the terms and provision of this
                agreement. Additionally, when using these particular services,
                you shall be subject to any posted guidelines or rules
                applicable to such services.
              </p>
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Important Notice
                    </h4>
                    <p className="text-blue-700">
                      If you do not agree to these Terms of Service, please do
                      not use our Service. Continued use of the Service
                      constitutes acceptance of these terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* User Accounts & Responsibilities */}
          <motion.section
            id="accounts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              <User className="w-6 h-6 text-teal-700" />
              2. User Accounts & Responsibilities
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3 text-teal-800">
                  Account Creation
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-700 font-bold mt-1">2.1</span>
                    <span>
                      You must provide accurate, current, and complete
                      information during registration.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-700 font-bold mt-1">2.2</span>
                    <span>
                      You are responsible for maintaining the confidentiality of
                      your account credentials.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-700 font-bold mt-1">2.3</span>
                    <span>
                      You must notify us immediately of any unauthorized use of
                      your account.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3 text-teal-800">
                  Prohibited Activities
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">Do Not</h4>
                    <ul className="space-y-1 text-red-600">
                      <li>• Use the Service for illegal purposes</li>
                      <li>• Upload malicious software</li>
                      <li>• Harass other users</li>
                      <li>• Spam or phishing attempts</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">Do</h4>
                    <ul className="space-y-1 text-green-600">
                      <li>• Use respectful communication</li>
                      <li>• Report suspicious activities</li>
                      <li>• Protect your login credentials</li>
                      <li>• Comply with all applicable laws</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Our Services */}
          <motion.section
            id="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              <Shield className="w-6 h-6 text-teal-700" />
              3. Our Services
            </h2>
            <div className="space-y-6">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-teal-800">
                  Service Description
                </h3>
                <p className="text-gray-700 mb-4">
                  Garments Tracker provides inventory management, order
                  tracking, and supply chain management solutions for the
                  garments industry. Our services include:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      Core Features
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Real-time inventory tracking</li>
                      <li>• Order management system</li>
                      <li>• Supplier coordination</li>
                      <li>• Production scheduling</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      Additional Services
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Analytics and reporting</li>
                      <li>• Mobile access</li>
                      <li>• API integration</li>
                      <li>• Customer support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3 text-teal-800">
                  Service Modifications
                </h3>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-700">
                      We reserve the right to modify, suspend, or discontinue
                      any part of our Service at any time. We will provide
                      reasonable notice for any significant changes that may
                      affect your use of the Service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Payments & Billing */}
          <motion.section
            id="payments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-teal-700" />
              4. Payments & Billing
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Subscription Plans
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Monthly/Annual billing cycles</li>
                    <li>• Auto-renewal by default</li>
                    <li>• Cancel anytime</li>
                    <li>• No hidden fees</li>
                  </ul>
                </div>
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Payment Methods
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Credit/Debit Cards</li>
                    <li>• Bank Transfers</li>
                    <li>• Mobile Payments</li>
                    <li>• Secure payment gateways</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Refund Policy
                    </h4>
                    <p className="text-yellow-700">
                      Refunds are processed within 7-10 business days for
                      eligible cases. Subscription fees are generally
                      non-refundable after 30 days of service use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              5. Intellectual Property
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                All content, features, and functionality of the Service are
                owned by Garments Tracker and are protected by international
                copyright, trademark, patent, trade secret, and other
                intellectual property laws.
              </p>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  License Grant
                </h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable
                  license to access and use the Service for your business
                  purposes in accordance with these Terms.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              6. Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                To the maximum extent permitted by law, Garments Tracker shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use or
                inability to use the Service.
              </p>
              <div className="bg-red-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-red-800">
                  Disclaimer
                </h3>
                <p className="text-red-700">
                  The Service is provided "as is" without warranties of any
                  kind. We do not guarantee that the Service will be
                  uninterrupted, secure, or error-free.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Governing Law & Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-teal-700" />
                  Governing Law
                </h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700">
                    These Terms shall be governed by and construed in accordance
                    with the laws of Bangladesh, without regard to its conflict
                    of law provisions.
                  </p>
                  <p className="mt-3 text-gray-600 text-sm">
                    Any disputes shall be resolved in the courts of Dhaka,
                    Bangladesh.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-700" />
                  Contact Information
                </h3>
                <div className="bg-teal-50 p-5 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    For questions about these Terms of Service, please contact:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Legal Department:</strong>{' '}
                      legal@garmentstracker.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> Garments Tracker Ltd., Dhaka,
                      Bangladesh
                    </p>
                    <p className="text-gray-700">
                      <strong>Response Time:</strong> 3-5 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Acceptance Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 p-6 bg-teal-50 border border-teal-200 rounded-xl text-center"
          >
            <h3 className="text-xl font-semibold mb-3 text-teal-800">
              Acceptance of Terms
            </h3>
            <p className="text-gray-700 mb-4">
              By using our Service, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;

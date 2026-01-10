import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  Globe,
  Cookie,
  Database,
  Users,
  Mail,
} from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Garments Tracker</title>
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
            <Shield className="w-16 h-16 text-teal-700" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Privacy <span className="text-teal-700">Policy</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Last Updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className=" mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
              <Lock className="w-6 h-6 text-teal-700" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Garments Tracker, we are committed to protecting your privacy
              and personal information. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our website and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
            </p>
          </motion.section>

          {/* Information We Collect */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
              <Database className="w-6 h-6 text-teal-700" />
              Information We Collect
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h3 className="text-xl font-medium mb-3 text-teal-700">
                Personal Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Name, email address, phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Company/organization details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Billing and shipping addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>
                    Payment information (processed securely through third-party
                    providers)
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3 text-teal-700">
                Automatically Collected Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>IP address and browser type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Device information and operating system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Usage data and analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Cookies and tracking technologies</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
              <Eye className="w-6 h-6 text-teal-700" />
              How We Use Your Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-teal-800">
                  Service Delivery
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Provide and maintain our services</li>
                  <li>• Process transactions</li>
                  <li>• Send order confirmations</li>
                  <li>• Customer support</li>
                </ul>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-teal-800">
                  Improvement & Communication
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Improve our website and services</li>
                  <li>• Send updates and notifications</li>
                  <li>• Respond to inquiries</li>
                  <li>• Marketing communications (with consent)</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Cookies & Tracking */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-teal-700" />
              Cookies & Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity
              on our website and hold certain information. Cookies are files
              with a small amount of data that may include an anonymous unique
              identifier.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                Essential Cookies
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                Performance Cookies
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                Functional Cookies
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                Marketing Cookies
              </span>
            </div>
          </motion.section>

          {/* Data Sharing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
              <Users className="w-6 h-6 text-teal-700" />
              Data Sharing & Third Parties
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to outside parties except in the
              following circumstances:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-teal-700 font-bold">1.</span>
                  <span>
                    With trusted third-party service providers who assist us in
                    operating our website, conducting our business, or servicing
                    you, so long as those parties agree to keep this information
                    confidential.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-700 font-bold">2.</span>
                  <span>
                    When we believe release is appropriate to comply with the
                    law, enforce our site policies, or protect ours or others'
                    rights, property, or safety.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-700 font-bold">3.</span>
                  <span>
                    In connection with a merger, acquisition, or sale of all or
                    a portion of our assets.
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
              <Globe className="w-6 h-6 text-teal-700" />
              Your Data Protection Rights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-teal-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-teal-800">
                  Right to Access
                </h3>
                <p className="text-gray-700">
                  You have the right to request copies of your personal data.
                </p>
              </div>
              <div className="border border-teal-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-teal-800">
                  Right to Rectification
                </h3>
                <p className="text-gray-700">
                  You have the right to request correction of inaccurate
                  information.
                </p>
              </div>
              <div className="border border-teal-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-teal-800">
                  Right to Erasure
                </h3>
                <p className="text-gray-700">
                  You have the right to request deletion of your personal data.
                </p>
              </div>
              <div className="border border-teal-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-teal-800">
                  Right to Object
                </h3>
                <p className="text-gray-700">
                  You have the right to object to our processing of your
                  personal data.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="bg-teal-50 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
                <Mail className="w-6 h-6 text-teal-700" />
                Contact Us for Privacy Concerns
              </h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or wish to
                exercise your data protection rights, please contact us:
              </p>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@garmentstracker.com
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Privacy Officer, Garments Tracker,
                  Dhaka, Bangladesh
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> We aim to respond to all
                  privacy-related inquiries within 7 business days.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Policy Updates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 p-6 bg-gray-100 rounded-lg"
          >
            <p className="text-gray-700 text-center">
              <strong>Note:</strong> We may update this Privacy Policy from time
              to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

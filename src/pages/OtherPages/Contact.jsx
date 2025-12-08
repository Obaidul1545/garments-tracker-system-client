import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center my-10">
        <h1 className="text-3xl font-semibold mb-4">
          Contact <span className="text-teal-700">Us</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Have questions? We’re always here to help. Send us a message and we’ll
          get back to you shortly.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 text-gray-800 py-5 px-4 mb-30">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white flex-1 shadow-lg rounded-md p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-teal-700" />
              <p className="text-gray-700">info@garmentstracker.com</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-teal-700" />
              <p className="text-gray-700">+880 1700-000000</p>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-teal-700" />
              <p className="text-gray-700">Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="text-gray-600">Sat – Thu: 10:00 AM – 7:00 PM</p>
            <p className="text-gray-600">Friday: Closed</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white flex-1 shadow-lg rounded-md p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

          <div className="grid gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-700"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-700"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-700"
            ></textarea>

            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-500 text-white font-semibold py-3 rounded-md transition w-full cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;

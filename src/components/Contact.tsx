'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PersonalDetails } from '../../sanity.types';

const Contact = ({ personalDetails }: {personalDetails: PersonalDetails}) => {
    return (
      <section
        id="contact"
        className="overflow-x-clip py-32 text-white mx-auto px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Heading & Details */}
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl font-bold text-gray-300 "
            >
              Get in <span className="text-purple-400">Touch</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 rounded-2xl space-y-8 glass"
            >
              <div className="space-y-2">
                <p className="text-lg text-gray-300">Phone</p>
                <Link
                  href={`https://wa.me/${personalDetails.phoneNumber?.replace(/\D/g, "")}`}
                  className="text-2xl font-semibold text-white flex items-center gap-2"
                  target="_blank"
                >
                  <p className="hover:text-gray-400 transition-colors duration-300">
                    {personalDetails.phoneNumber}
                  </p>
                  <span className="text-gray-500">↗</span>
                </Link>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-gray-300">Email</p>
                <Link
                  href={`mailto:${personalDetails.email}`}
                  className="text-2xl font-semibold text-white  flex items-center gap-2"
                >
                  <p
                    className="hover:text-gray-400 transition duration-300"
                    style={{ wordBreak: "break-word" }}
                  >
                    {personalDetails.email}
                  </p>
                  <span className="text-gray-500">↗</span>
                </Link>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-gray-300">Office</p>
                <address className="text-xl text-bold text-gray-200 not-italic leading-relaxed">
                  {personalDetails.address}
                </address>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {personalDetails.githubUrl && (
                  <Link
                    href={personalDetails.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </Link>
                )}
                {personalDetails.linkedinUrl && (
                  <Link
                    href={personalDetails.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full h-full min-h-[400px] rounded-2xl mt-4 overflow-hidden"
          >
            <iframe
              src={personalDetails.mapLink}
              title="Subhan Anwer office location on Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </section>
    );
}

export default Contact

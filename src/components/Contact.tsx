'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PersonalDetails } from '../../sanity.types';

const Contact = ({ personalDetails }: {personalDetails: PersonalDetails}) => {
    return (
      <section
        id="contact"
        className="overflow-x-clip py-32 text-whitemax-w-[1200px] mx-auto px-8"
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

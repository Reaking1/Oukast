import React from "react";
import Footer from "@/Footer/Footersection";

const Contact: React.FC = () => {
  return (
    <>
      <section className="bg-[#f5f5f5] text-black py-20 px-6 md:px-20 font-ubuntu">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 text-base md:text-lg">
            Have a question, idea, or want to join the team? Let’s talk!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          {/* Contact Form */}
          <form
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Type your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-1 text-purple-700">Email</h3>
              <p className="text-gray-700">warriorsofheritage@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1 text-purple-700">Location</h3>
              <p className="text-gray-700">
                Remote / Online — built in South Africa, connected worldwide
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-700">Socials</h3>
              <ul className="text-gray-700 space-y-1">
                <li>
                  <strong>TikTok:</strong> @theghostking2003

                </li>
                <li>
                  <strong>YouTube:</strong> The Ghostking
                </li>
                <li>
                  <strong>Discord:</strong> Coming Soon
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;

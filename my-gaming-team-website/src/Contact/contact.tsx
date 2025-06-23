import React from "react";
import Footer from "@/Footer/Footersection";

const Contact: React.FC = () => {
  return (
    <>
      <section className="bg-[#f5f5f5] text-black py-20 px-6 md:px-20 font-ubuntu">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 mt-6">Contact Us</h2>
        <p className="text-center text-gray-700 mb-12">
          Have a question, idea, or want to join the team? Let’s talk!
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-800">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-gray-700">warriorsofheritage@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Location</h3>
              <p className="text-gray-700">Remote / Online — built in South Africa, connected worldwide</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Socials</h3>
              <ul className="text-gray-700 space-y-1">
                <li><strong>TikTok:</strong> @woh_team</li>
                <li><strong>YouTube:</strong> Warriors of Heritage</li>
                <li><strong>Discord:</strong> Coming Soon</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Now the footer is cleanly placed after the content section */}
      <Footer />
    </>
  );
};

export default Contact;

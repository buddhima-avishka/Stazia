import React from "react";
import AboutHeader from "../components/AboutHeader";

function About() {
  return (
    <div>
      <AboutHeader />

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        <p className="soligant text-xl text-center text-gray-900">
          At Stazia, we connect travelers with trusted accommodation providers
          worldwide. Our platform ensures transparent pricing, real-time
          availability, and secure booking — giving you peace of mind from start
          to finish.
        </p>
        <p className="soligant text-xl text-center text-gray-900 mt-10">
          We believe every journey should start with confidence. That’s why we
          focus on delivering a smooth, user-friendly experience with
          personalized recommendations, verified reviews, and 24/7 support.
        </p>
        {/* Why Choose Stazia */}
        <h1 className="melodin text-3xl md:text-4xl lg:text-5xl font-bold text-gray-500 text-center mb-12 mt-20">
          Why Choose Stazia?
        </h1>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-all duration-300">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Efficiency:
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="text-center border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-all duration-300">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Convenience:
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="text-center border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-all duration-300">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Personalization:
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>

        {/* Mission and Vision Footer */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="melodin text-3xl md:text-4xl font-bold text-gray-500 mb-4">
              Our Mission
            </h2>
            <p className="soligant text-gray-900 text-lg leading-relaxed max-w-3xl mx-auto">
              To make hotel booking effortless and reliable by combining
              technology, trust, and travel expertise.
            </p>
          </div>
          <div className="text-center">
            <h2 className="melodin text-3xl md:text-4xl font-bold text-gray-500 mb-4">
              Our Vision
            </h2>
            <p className="soligant text-gray-900 text-lg leading-relaxed max-w-3xl mx-auto">
              To be the leading platform for hotel bookings, recognized for our
              commitment to customer satisfaction and innovation.
            </p>
          </div>
        </div>

        {/* Meet Our Team */}
        <section className="max-w-4xl mx-auto mt-20">
          <h1 className="melodin text-3xl font-bold text-center mx-auto text-gray-500">
            Meet Our Team
          </h1>
          <p className="soligant text-sm text-gray-900 text-center mt-2 max-w-xl mx-auto">
            Our team works tirelessly to ensure every traveler enjoys a smooth, secure, and memorable booking experience with Stayzia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-12">
            <div className="flex flex-col hover:-translate-y-1 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"
                alt="User Image"
                className="w-52 h-64 object-cover"
              />
              <h3 className="text-lg font-medium text-slate-700 mt-2">
                Donald Jackman
              </h3>
              <p className="text-sm text-indigo-600">Founder & CEO</p>
            </div>
            <div className="flex flex-col hover:-translate-y-1 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600"
                alt="User Image"
                className="w-52 h-64 object-cover"
              />
              <h3 className="text-lg font-medium text-slate-700 mt-2">
                Michael Brown
              </h3>
              <p className="text-sm text-indigo-600">Chief Technology Officer (CTO)</p>
            </div>
            <div className="flex flex-col hover:-translate-y-1 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop"
                alt="User Image"
                className="w-52 h-64 object-cover"
              />
              <h3 className="text-lg font-medium text-slate-700 mt-2">
                Olivia Martinez
              </h3>
              <p className="text-sm text-indigo-600">Project Manager</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;

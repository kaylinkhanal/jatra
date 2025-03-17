import React from 'react';
import { ArrowUpRight, Sparkles, Filter, Calendar, Building } from 'lucide-react';

const features = [
  {
    title: "Event Discovery",
    description: "Explore thousands of events hFening around you",
    color: "#2563eb",
    icon: Calendar
  },
  {
    title: "Smart Filtering",
    description: "Find the perfect experience that matches your interests",
    color: "#ec4899",
    icon: Filter
  },
  {
    title: "Easy Booking",
    description: "Seamless booking process with instant confirmation",
    color: "#10b981",
    icon: Sparkles
  },
  {
    title: "Venue Management",
    description: "Design and manage your venues with ease",
    color: "#f59e0b",
    icon: Building
  }
];

function FeatureSection() {
  return (
    <div id='features' className="min-h-screen bg-black">
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create and manage successful events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon
                  size={24}
                  style={{ color: feature.color }}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                {feature.title}
                <ArrowUpRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </h3>
              
              <p className="text-gray-600">
                {feature.description}
              </p>

              <div
                className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-300 ease-out"
                style={{
                  backgroundColor: feature.color,
                  width: '0%',
                }}
              />
              
              <div
                className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-300 group-hover:w-full"
                style={{
                  backgroundColor: feature.color,
                  width: '0%',
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FeatureSection;
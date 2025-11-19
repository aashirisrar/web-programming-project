"use client";

import { motion } from "framer-motion";
import { Clock, Brain, Sparkles, Target, BarChart } from "lucide-react";

const stats = [
  {
    name: "Time Saved",
    value: "70%",
    description:
      "Manage all your links in one place with our efficient dashboard",
    icon: Clock,
  },
  {
    name: "Engagement",
    value: "100%",
    description: "Increase click-through rates with branded, memorable links",
    icon: Brain,
  },
  {
    name: "Link Quality",
    value: "85%",
    description: "Improve user experience with reliable, fast-loading links",
    icon: Sparkles,
  },
  {
    name: "Target Audience",
    value: "90%",
    description: "Better reach your audience with targeted link routing",
    icon: Target,
  },
  {
    name: "Conversion Rate",
    value: "95%",
    description: "Boost conversions with optimized links and landing pages",
    icon: BarChart,
  },
];

const Productivity = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium sm:text-4xl mb-4 text-white">
            Boost Your Link Management Efficiency
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our powerful platform helps you manage all your links efficiently,
            with detailed analytics and streamlined organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="premium-card-neon"
              >
                <div className="premium-icon">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="premium-title">{stat.name}</h3>
                <div className="text-3xl font-bold text-purple-400 mb-4">
                  {stat.value}
                </div>
                <p className="premium-description">{stat.description}</p>
                <a href="#" className="premium-link">
                  View metrics
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Productivity;

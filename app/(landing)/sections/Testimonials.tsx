"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Andrew Johnson",
    role: "Content Creator",
    image: "/assets/avatar-1.png",
    content:
      "This link management platform has revolutionized my content strategy. I can now track which posts perform best and optimize my link sharing accordingly with detailed analytics and insights.",
    rating: 5,
    platform: "Instagram",
    subscribers: "250K+ followers",
  },
  {
    name: "Michael Chen",
    role: "Digital Marketing Director",
    image: "/assets/avatar-2.png",
    content:
      "The branded short links and analytics have significantly improved our campaign performance. Our click-through rates increased by 35% in just one month using this powerful platform.",
    rating: 5,
    platform: "Marketing Agency",
    subscribers: "100+ campaigns",
  },
  {
    name: "Davis Robert",
    role: "E-commerce Entrepreneur",
    image: "/assets/avatar-3.png",
    content:
      "I use the link management tool for all my product promotions. The ability to create custom URLs and track conversions has been invaluable for growing my business and understanding customer behavior.",
    rating: 5,
    platform: "Online Store",
    subscribers: "200% growth",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium sm:text-4xl mb-4 text-white">
            Trusted by Digital Marketers & Content Creators
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our clients are saying about LinksHubb and how it&apos;s
            transforming their link management strategy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card-neon h-full flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-purple-500/20">
                    <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <blockquote className="flex-grow text-gray-300 mb-6 leading-relaxed premium-description">
                &quot;{testimonial.content}&quot;
              </blockquote>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{testimonial.platform}</span>
                <span>{testimonial.subscribers}</span>
              </div>

              <a href="#" className="premium-link">
                View case study
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-300">
            Join thousands of businesses who are organizing and managing their
            links efficiently with LinksHubb.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

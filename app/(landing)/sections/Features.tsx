"use client";

import { motion } from "framer-motion";
import { BarChart3, Palette, Link, QrCode, Eye, MousePointer } from "lucide-react";

const features = [  {
    icon: QrCode,
    title: "Easy Sharing",
    description:
      "Share your link everywhere with just one click. Generate your link, copy your unique link, or share directly to social media. Make it effortless for your audience to find and follow all your content in one place.",
  },
  {
    icon: Palette,
    title: "Custom Themes & Branding",
    description:
      "Create a unique brand experience with custom themes, colors, fonts, and backgrounds. Upload your own images, set gradients, and match your brand identity perfectly. Stand out with professional-looking pages.",
  },
  {
    icon: Link,
    title: "Smart Link Management",
    description:
      "Organize and manage all your links in one place. Add social media profiles, websites, videos, music, and any content you want to share. Drag and drop to reorder, schedule links, and create collections for different campaigns.",
    hasCodeBlock: true,
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >          <h2 className="text-3xl font-medium sm:text-4xl mb-4 text-white">
            One link to rule them all in one place.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create a beautiful landing page for all your links. Share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-6">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card-neon h-full"
            >
              <div className="premium-icon">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="premium-title">{feature.title}</h3>
              <p className="premium-description">{feature.description}</p>              <a href="#" className="premium-link">
                {feature.title === "Easy Sharing"
                  ? "Start sharing"
                  : "Customize theme"}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="premium-card-neon">            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="premium-icon">
                  <Link className="h-6 w-6 text-white" />
                </div>
                <h3 className="premium-title">Smart Link Management</h3>
                <p className="premium-description">{features[2].description}</p>
                <a href="#" className="premium-link">
                  Manage your links
                </a>
              </div>
              <div className="code-block">
                <div className="code-header">LinkManager.js</div>
                <div className="p-4">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span className="code-content">
                      <span className="code-comment">{"// createLinkProfile"}</span>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span className="line-number">2</span>
                    <span className="code-content">
                      <span className="code-keyword">function</span>{" "}
                      <span className="code-function">createLinkProfile</span>
                      (username, links) {"{"}
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">3</span>
                    <span className="code-content ml-4">
                      <span className="code-keyword">const</span> profile = {"{"}
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">4</span>
                    <span className="code-content ml-8">
                      username: <span className="code-string">username</span>,
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">5</span>
                    <span className="code-content ml-8">
                      links: <span className="code-string">links</span>,
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">6</span>
                    <span className="code-content ml-8">
                      analytics: <span className="code-string">{"{}"}</span>,
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">7</span>
                    <span className="code-content ml-4">{"}"}</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">8</span>
                    <span className="code-content ml-4">
                      <span className="code-keyword">return</span> profile;
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">9</span>
                    <span className="code-content">{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

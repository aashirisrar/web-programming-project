"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export function ProductShowcase() {
  const registerModal = useRegisterModal();

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium sm:text-4xl mb-4 text-white">
            Our powerful analytics provides invaluable insights.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Easily track the performance of your links and gain valuable
            insights into your audience with our comprehensive analytics
            dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="premium-card-neon">
            <div className="premium-icon">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="premium-title mb-6">Analytics Dashboard</h3>
            <div className="rounded-lg overflow-hidden border border-purple-500/20">
              <Image
                src="/images/analytics-preview.png"
                alt="Analytics Dashboard"
                width={1200}
                height={800}
                className="w-full"
              />
            </div>
            <p className="premium-description mt-6">
              Our comprehensive analytics dashboard provides real-time insights
              into your link performance, audience engagement, and conversion
              metrics to help you optimize your strategy.
            </p>
            <a href="#" className="premium-link">
              View dashboard
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full"
            onClick={registerModal.onOpen}
          >
            Download for free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, ListChecks, Sparkles } from "lucide-react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Image from "next/image";
import { cn } from '@/lib/utils';



export function Hero() {
  const registerModal = useRegisterModal();
  const router = useRouter();

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-black"></div> */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "url(/images/hero-background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/80"></div> */}
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-36 sm:pt-48 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-[960px] mx-auto'
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-white/30 text-[#F2F4F8] text-sm font-medium mb-6">
                We just raised $20M in Series B. Learn more
              </span>
            </div>
            <h1 className="bg-gradient-to-br from-white to-white/60 text-transparent bg-clip-text text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              Manage All Your Links in One Place
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Create, customize, and share short links that stand out. Our
              platform helps you track engagement, manage multiple links, and
              boost your online presence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={registerModal.onOpen}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/#pricing")}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-full"
            >
              View Pricing
            </Button>
          </motion.div>

          {/* Dashboard Preview Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 mb-12 max-w-4xl mx-auto"
          >
            <div
              className="relative rounded-xl overflow-hidden border border-purple-500/30 neon-glow"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(139, 92, 246, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.15)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              <Image
                src="/images/dashboard-preview.png"
                alt="LinksHubb Dashboard Interface"
                width={1400}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>

          {/* Company Logos Section with Dividers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-24 mb-24"
          >
            {/* Upper Divider Line */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent max-w-md"></div>
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Trusted by teams at over 1,000 of the world&apos;s leading
              organizations
            </p>
            <div className="flex items-center justify-center gap-12 opacity-70 flex-wrap">
              <div className="text-white font-bold text-xl tracking-wider">
                DELL
              </div>
              <div className="text-white font-normal text-xl">zendesk</div>
              <div className="text-white font-bold text-xl">Rakuten</div>
              <div className="text-white font-medium text-lg flex items-center gap-1">
                <span className="text-sm">🏢</span>
                <span>PACIFIC FUNDS</span>
              </div>
              <div className="text-white font-bold text-xl flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <span className="text-black text-xs font-bold">N</span>
                </div>
                <span>NCR</span>
              </div>
              <div className="text-white font-medium text-xl flex items-center gap-1">
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-black rounded-sm"></div>
                </div>
                <span>Lattice</span>
              </div>
              <div className="text-white font-bold text-2xl">TED</div>
            </div>

            {/* Lower Divider Line */}
            <div className="flex items-center justify-center mt-12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent max-w-md"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto"
          >
            {[
              {
                icon: BarChart3,
                title: "Quick Link Creation",
                description:
                  "Create and organize your links quickly with our intuitive interface that streamlines your workflow.",
              },
              {
                icon: ListChecks,
                title: "Link Management",
                description:
                  "Access all your links in one place with powerful organization tools and advanced filtering options.",
              },
              {
                icon: Sparkles,
                title: "Smart Analytics",
                description:
                  "Track link performance with detailed analytics and insights to optimize your engagement strategy.",
              },
            ].map((feature, index) => (
              <div key={index} className="premium-card-neon sm:mb-24">
                <div className="premium-icon">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="premium-title">{feature.title}</h3>
                <p className="premium-description">{feature.description}</p>
                <a href="#" className="premium-link">
                  View dashboard
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

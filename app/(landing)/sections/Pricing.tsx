"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap, DollarSign, Crown, Building } from "lucide-react";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const tiers = [
  {
    name: "Free",
    price: "$0",
    icon: DollarSign,
    description:
      "Perfect for casual link shortening needs with essential features to get you started.",
    features: [
      "50 links per month",
      "Basic link analytics",
      "Standard short URLs",
      "Community support",
    ],
    cta: "Get Started",
    href: "/dashboard",
  },
  {
    name: "Pro",
    price: "$4",
    icon: Crown,
    description:
      "Best for creators and small businesses who need advanced link management capabilities.",
    features: [
      "Unlimited links",
      "Custom branded URLs",
      "Advanced analytics",
      "QR code generation",
      "Priority support",
      "Link expiration settings",
      "Password protection",
    ],
    cta: "Upgrade to Pro",
    href: "/dashboard",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    icon: Building,
    description:
      "For marketing teams and large organizations requiring enterprise-level features and support.",
    features: [
      "Everything in Pro",
      "Team management",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "SLA support",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export function Pricing() {
  const registerModal = useRegisterModal();

  return (
    <section className="py-24" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium sm:text-4xl mb-4 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your link management needs. All plans
            include our core AI features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div
                className={`premium-card-neon h-full flex flex-col ${
                  tier.featured ? "neon-glow" : ""
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full bg-purple-600 text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="premium-icon">
                  <tier.icon className="h-6 w-6 text-white" />
                </div>

                <div className="mb-6">
                  <h3 className="premium-title">{tier.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="ml-1 text-gray-400">/month</span>
                    )}
                  </div>
                  <p className="premium-description">{tier.description}</p>
                </div>

                <ul className="space-y-3 flex-grow mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={registerModal.onOpen}
                  size="lg"
                  className={
                    "w-full rounded-full " +
                    (tier.featured
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-transparent border border-purple-500/30 text-purple-300 hover:bg-purple-500/10")
                  }
                  variant={tier.featured ? "default" : "outline"}
                >
                  {tier.cta}
                  {tier.featured && <Zap className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

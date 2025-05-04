"use client";

import {
  ClipboardList,
  UploadCloud,
  ShoppingCart,
  UserCheck,
} from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "1. Post Your Item",
    description:
      "List your used item with images, description, category, and price.",
  },
  {
    icon: ClipboardList,
    title: "2. Get Noticed",
    description:
      "Your listing becomes visible to thousands of potential buyers.",
  },
  {
    icon: ShoppingCart,
    title: "3. Sell & Deliver",
    description:
      "Communicate with buyers, finalize the deal, and deliver the item.",
  },
  {
    icon: UserCheck,
    title: "4. Track History",
    description: "View your sales and purchases in the dashboard anytime.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-300 mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md dark:hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                <step.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

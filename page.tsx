"use client";

import { useState } from "react";
import { categories, technologies, TechCategory } from "@/lib/technologies";

export default function TechnologiesPage() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | "All">(
    "All"
  );

  const filteredTech =
    activeCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Our Technology Stack
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We use a modern, scalable, and robust stack to build high-quality
          digital solutions.
        </p>
      </div>

      <div className="flex justify-center gap-2 mt-12 border-b">
        <button onClick={() => setActiveCategory("All")} className={`px-4 py-2 text-sm font-medium ${activeCategory === 'All' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>All</button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-medium ${activeCategory === category ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
        {filteredTech.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center justify-center gap-3 p-6 border rounded-lg shadow-sm"
          >
            <tech.icon className="h-10 w-10 text-gray-700" />
            <span className="text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
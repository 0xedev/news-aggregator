import { useState } from "react";
import Button from "src/components/UI/Button.jsx";

export default function NewsFilter({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState("trending");

  const categories = [
    { name: "Trending", value: "trending" },
    { name: "IPL", value: "ipl" },
    { name: "Finance", value: "finance" },
    { name: "Politics", value: "politics" },
    { name: "Technology", value: "technology" },
    { name: "Health", value: "health" },
  ];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? "primary" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category.value)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

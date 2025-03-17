import { useState } from "react";
import { useRouter } from "next/router";
import Button from "src/components/UI/Button.jsx";

export default function SearchBar({ className = "" }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex ${className}`}>
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      />
      <Button type="submit" variant="primary" className="rounded-l-none">
        Search
      </Button>
    </form>
  );
}

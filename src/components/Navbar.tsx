import React, { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
  onTopicSelect: (topic: string) => void;
}

const topics = ["Politics", "Sports", "US", "Technology", "Business", "World"];

function Navbar({ onSearch, onTopicSelect }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleTopicClick = (topic: string) => {
    onTopicSelect(topic);
    setIsMenuOpen(false); // Close menu after selection on mobile
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-navbar shadow-md fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4">
        {/* Top bar with logo and hamburger */}
        <div className="flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-neutral">
            News App
          </a>

          {/* Hamburger Menu Button (Mobile only) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-neutral focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center ml-auto">
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded text-sm w-64"
              placeholder="Search..."
              onChange={handleInputChange}
              value={searchTerm}
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded ml-2 hover:bg-blue-700 transition-colors"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>

        {/* Mobile menu - includes topics and search */}
        <div
          className={`mt-4 md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } transition-all duration-300 ease-in-out`}
        >
          {/* Mobile Search */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded text-sm flex-grow"
              placeholder="Search..."
              onChange={handleInputChange}
              value={searchTerm}
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded ml-2 hover:bg-blue-700 transition-colors"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>

          {/* Mobile Topics */}
          <ul className="space-y-2">
            {topics.map((topic) => (
              <li key={topic}>
                <button
                  onClick={() => handleTopicClick(topic)}
                  className="text-primary hover:bg-gray-100 px-2 py-1 rounded transition-colors block w-full text-left"
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Topics */}
        <ul className="hidden md:flex items-center space-x-4 mt-4">
          {topics.map((topic) => (
            <li key={topic}>
              <button
                onClick={() => handleTopicClick(topic)}
                className="text-primary hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                {topic}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

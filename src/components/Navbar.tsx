import React, { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <nav>
      <div className="main-nav container flex">
        {/* Replace with your logo */}
        <a href="#" className="company-logo">
          News App
        </a>

        <div className="search-bar flex">
          <input
            type="text"
            className="news-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

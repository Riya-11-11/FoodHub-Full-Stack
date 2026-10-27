import "./SearchBar.css";
import { useState, useEffect } from "react";

function SearchBar({
  selectedCuisine,
  setSelectedCuisine,
  searchText,
  setSearchText,
  selectedSort,
  setSelectedSort,
  appliedSearchText,
  setAppliedSearchText,
  appliedSelectedSort,
  setAppliedSelectedSort,
  appliedSelectedCuisine,
  setAppliedSelectedCuisine,
  pageNumber,
  setPageNumber,
}) {
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/restaurants/cuisine-stats`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cuisine stats:", data);
        setCuisines(data.data.map((item) => item._id));
      })
      .catch((error) => console.error("Error fetching cuisine stats:", error));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedSearchText(searchText);
    setAppliedSelectedCuisine(selectedCuisine);
    setAppliedSelectedSort(selectedSort);
    setPageNumber(1); // Reset to the first page on new search
  };

  return (
    <div className="search-panel">
      <div className="search-field">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search for restaurants..."
          aria-label="Search for restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="search-select">
        <span className="select-icon">♨</span>

        <select
          onChange={(e) => setSelectedCuisine(e.target.value)}
          value={selectedCuisine}
        >
          <option value="" disabled>
            All Cuisines
          </option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <div className="search-select">
        <span className="select-icon">↕</span>

        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="rating">Sort by Rating</option>
          <option value="low">Lowest Rating</option>
          <option value="name">Name</option>
        </select>
      </div>

      <button className="search-submit" onClick={handleSearchSubmit}>
        <span>⌕</span>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

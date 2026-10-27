import "./SearchBar.css";
import { useState, useEffect } from "react";

function SearchBar({ selectedCuisine, setSelectedCuisine }) {
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

  console.log("Cuisines:", cuisines);

  return (
    <div className="search-panel">
      <div className="search-field">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search for restaurants..."
          aria-label="Search for restaurants"
        />
      </div>

      <div className="search-select">
        <span className="select-icon">♨</span>

        <select
          onChange={(e) => setSelectedCuisine(e.target.value)}
          defaultValue=""
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

        <select defaultValue="rating">
          <option value="rating">Sort by Rating</option>
          <option value="low">Lowest Rating</option>
          <option value="name">Name</option>
        </select>
      </div>

      <button className="search-submit">
        <span>⌕</span>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

import "./SearchBar.css";

function SearchBar() {
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

        <select defaultValue="">
          <option value="" disabled>
            All Cuisines
          </option>
          <option>Indian</option>
          <option>Italian</option>
          <option>Chinese</option>
          <option>Japanese</option>
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
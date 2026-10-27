import SearchBar from "./SearchBar";
import "./Hero.css";

function Hero({ selectedCuisine, setSelectedCuisine, searchText, setSearchText }) {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-eyebrow">GOOD FOOD · GREAT MOOD</p>

        <h1>
          Discover the Best
          <br />
          <span>Restaurants Near You</span>
        </h1>

        <p className="hero-description">
          From local favorites to global cuisines, find the
          perfect place to satisfy your cravings.
        </p>

        <SearchBar selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} searchText={searchText} setSearchText={setSearchText}/>
      </div>

      <div className="hero-tagline">
        <span>Good</span>
        <span>Food</span>
        <span>Brings</span>
        <span>People</span>
        <span>Together <b>♡</b></span>
      </div>

      <div className="hero-decoration"></div>
    </section>
  );
}

export default Hero;
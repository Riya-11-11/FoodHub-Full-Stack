import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <a href="#" className="navbar-logo">
        <span className="logo-icon">♨</span>

        <span>
          Food<span className="logo-orange">Hub</span>
        </span>
      </a>

      <nav className="navbar-links">
        <a href="#" className="active">
          Home
        </a>

        <a href="#restaurants">Restaurants</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="navbar-actions">
        <button className="navbar-icon" aria-label="Search">
          ⌕
        </button>

        <button className="navbar-icon" aria-label="Favorites">
          ♡
        </button>

        <button className="navbar-profile" aria-label="Profile">
          ♙
        </button>
      </div>
    </header>
  );
}

export default Navbar;

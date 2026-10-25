import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <a href="#" className="footer-logo">
          Food<span>Hub</span>
        </a>

        <p id="about">
          Discover great food. Find your next favorite.
        </p>
      </div>

      <div className="footer-bottom">
        <span>© 2026 FoodHub. Made for food lovers.</span>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RestaurantList from "./components/RestaurantList";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="foodhub">
      <Navbar />
      <Hero />
      <RestaurantList />
      <Pagination />
      <Footer />
    </div>
  );
}

export default App;
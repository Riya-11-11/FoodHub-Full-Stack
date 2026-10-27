import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RestaurantList from "./components/RestaurantList";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { useState } from "react";

import "./App.css";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState("");;
  return (
    <div className="foodhub">
      <Navbar />
      <Hero selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} />
      <RestaurantList pageNumber={pageNumber} setPageNumber={setPageNumber} selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} />
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <Footer />
    </div>
  );
}

export default App;

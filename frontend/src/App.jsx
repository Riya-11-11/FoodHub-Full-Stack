import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RestaurantList from "./components/RestaurantList";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { useState } from "react";

import "./App.css";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState("");

   const[searchText, setSearchText] = useState("");
  return (
    <div className="foodhub">
      <Navbar />
      <Hero selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} searchText={searchText} setSearchText={setSearchText} />
      <RestaurantList pageNumber={pageNumber} selectedCuisine={selectedCuisine} searchText={searchText} />
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <Footer />
    </div>
  );
}

export default App;

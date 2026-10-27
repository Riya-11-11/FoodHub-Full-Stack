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
  const [appliedSelectedCuisine, setAppliedSelectedCuisine] = useState("");

  const [searchText, setSearchText] = useState("");
  const [appliedSearchText, setAppliedSearchText] = useState("");

  const [selectedSort, setSelectedSort] = useState("rating");
  const [appliedSelectedSort, setAppliedSelectedSort] = useState("rating");

  return (
    <div className="foodhub">
      <Navbar />
      <Hero
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
        searchText={searchText}
        setSearchText={setSearchText}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        appliedSearchText={appliedSearchText}
        setAppliedSearchText={setAppliedSearchText}
        appliedSelectedCuisine={appliedSelectedCuisine}
        setAppliedSelectedCuisine={setAppliedSelectedCuisine}
        appliedSelectedSort={appliedSelectedSort}
        setAppliedSelectedSort={setAppliedSelectedSort}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      <RestaurantList
        pageNumber={pageNumber}
        selectedCuisine={selectedCuisine}
        searchText={searchText}
        selectedSort={selectedSort}
        appliedSelectedCuisine={appliedSelectedCuisine}
        appliedSearchText={appliedSearchText}
        appliedSelectedSort={appliedSelectedSort}
      />
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <Footer />
    </div>
  );
}

export default App;

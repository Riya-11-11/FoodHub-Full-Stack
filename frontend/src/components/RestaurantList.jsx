import RestaurantCard from "./RestaurantCard";
import "./RestaurantList.css";
import { useState, useEffect } from "react";

function RestaurantList({
  pageNumber,
  // selectedCuisine,
  // searchText,
  // selectedSort,
  appliedSelectedCuisine,
  appliedSearchText,
  appliedSelectedSort,
  totalPages,
  setTotalPages,
}) {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalRestaurants, setTotalRestaurants] = useState(0); // State to hold the total number of restaurants

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `${import.meta.env.VITE_API_URL}/api/restaurants?page=${pageNumber}&limit=10&cuisine=${appliedSelectedCuisine}&search=${appliedSearchText}&sort=${appliedSelectedSort}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        console.log("Restaurants received:", data.data);

        setRestaurantsData(data.data);
        setTotalPages(data.pagination.totalPages); // Update total pages from API response
        setTotalRestaurants(data.pagination.totalRestaurants); // Update total restaurants from API response

        console.log("Total pages:", data.pagination.totalPages);
        console.log("Total restaurants:", data.pagination.totalRestaurants);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [
    pageNumber,
    appliedSelectedCuisine,
    appliedSearchText,
    appliedSelectedSort,
  ]);

  return (
    <main className="restaurants-section" id="restaurants">
      <div className="section-heading">
        <div>
          <h2>Popular Restaurants</h2>
          <p>Top rated and most loved restaurants near you</p>
        </div>

        <a href="#restaurants" className="view-all">
          View All <span>→</span>
        </a>
      </div>
      <div className="pagination-info">
        {totalPages >= 1 && (
          <h2 className="page-indicator">
            Page {pageNumber} of {totalPages}
          </h2>
        )}
      </div>
      {loading ? (
        <p>Loading restaurants...</p>
      ) : error ? (
        <p>Error fetching restaurants. Please try again later.</p>
      ) : restaurantsData.length > 0 ? (
        <>
          <h2 className="total-restaurants">
            Total Restaurants: {totalRestaurants}
          </h2>

          <div className="restaurant-grid">
            {restaurantsData.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        </>
      ) : (
        <p>No restaurants found.</p>
      )}
    </main>
  );
}

export default RestaurantList;

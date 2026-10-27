import "./Pagination.css";
import { useState } from "react";

function Pagination({ pageNumber, setPageNumber }) {

  function handlePageChange(pageNumber) {
    setPageNumber(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  }

  function nextPageHandle() {
    if (pageNumber < 3) {
      console.log("Next page clicked");
      setPageNumber(pageNumber + 1); // Update the page number state
    }
  }

  function previousPageHandle() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1); // Update the page number state
      console.log("Previous page clicked");
    }
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="page-previous"
        onClick={previousPageHandle}
        disabled={pageNumber === 1}
      >
        ‹ <span>Previous</span>
      </button>

      <button
        className={pageNumber === 1 ? "page-number selected" : "page-number"}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
      <button
        className={pageNumber === 2 ? "page-number selected" : "page-number"}
        onClick={() => handlePageChange(2)}
      >
        2
      </button>
      <button
        className={pageNumber === 3 ? "page-number selected" : "page-number"}
        onClick={() => handlePageChange(3)}
      >
        3
      </button>

      <button
        className="page-next"
        onClick={nextPageHandle}
        disabled={pageNumber === 3}
      >
        <span>Next</span> ›
      </button>
    </nav>
  );
}

export default Pagination;

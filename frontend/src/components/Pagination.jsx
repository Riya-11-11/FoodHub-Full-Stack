import "./Pagination.css";

function Pagination() {
  function handlePageChange(pageNumber) {
    console.log(`Page changed to: ${pageNumber}`);
  }

  function nextPageHandle() {
    console.log("Next page clicked");
    handlePageChange(pageNumber+1); // Example: Change to page 2 when next is clicked
  }

  function previousPageHandle() {
    console.log("Previous page clicked");
    handlePageChange(pageNumber-1); // Example: Change to page 0 when previous is clicked

  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="page-previous"  onClick={previousPageHandle}>
        ‹ <span>Previous</span>
      </button>

      <button
        className="page-number selected"
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
      <button className="page-number" onClick={() => handlePageChange(2)}>
        2
      </button>
      <button className="page-number" onClick={() => handlePageChange(3)}>
        3
      </button>

      <button className="page-next" onClick={nextPageHandle}>
        <span>Next</span> ›
      </button>
    </nav>
  );
}

export default Pagination;

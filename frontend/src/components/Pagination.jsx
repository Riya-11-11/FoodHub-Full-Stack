import "./Pagination.css";

function Pagination({ pageNumber, setPageNumber, totalPages }) {
  function handlePageChange(pageNumber) {
    setPageNumber(pageNumber);
  }

  function nextPageHandle() {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1); // Update the page number state
    }
  }

  function previousPageHandle() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1); // Update the page number state
    }
  }

  return (
    <>
      {totalPages >= 1 && (
        <nav className="pagination" aria-label="Pagination">
          <button
            className="page-previous"
            onClick={previousPageHandle}
            disabled={pageNumber <= 1}
          >
            ‹ <span>Previous</span>{" "}
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={
                  pageNumber === page ? "page-number selected" : "page-number"
                }
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ),
          )}

          <button
            className="page-next"
            onClick={nextPageHandle}
            disabled={pageNumber === totalPages}
          >
            <span>Next</span> ›
          </button>
        </nav>
      )}
    </>
  );
}

export default Pagination;

interface PaginationProps {
  articlesPerPage: number;
  totalArticles: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

function Pagination({
  articlesPerPage,
  totalArticles,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers: number[] = [];

  // Calculate total pages
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  // Generate array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // For large number of pages, show limited numbers
  const getVisiblePageNumbers = () => {
    if (totalPages <= 7) {
      return pageNumbers;
    }

    // Always show first page, last page, current page, and some surrounding pages
    let visiblePages = [1];

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis indicator if needed
    if (startPage > 2) {
      visiblePages.push(-1); // -1 represents ellipsis
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    // Add ellipsis indicator if needed
    if (endPage < totalPages - 1) {
      visiblePages.push(-2); // -2 represents the second ellipsis
    }

    // Add last page
    visiblePages.push(totalPages);

    return visiblePages;
  };

  return (
    <nav className="flex justify-center mt-8 mb-4">
      <ul className="flex flex-wrap items-center">
        {/* Previous button */}
        <li className="mx-1">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-700"
            }`}
            aria-label="Previous page"
          >
            &laquo;
          </button>
        </li>

        {/* Page numbers */}
        {getVisiblePageNumbers().map((number, index) => (
          <li key={index} className="mx-1">
            {number < 0 ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to page ${number}`}
                aria-current={currentPage === number ? "page" : undefined}
              >
                {number}
              </button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li className="mx-1">
          <button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-700"
            }`}
            aria-label="Next page"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;

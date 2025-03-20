// import { React, useState, useEffect } from "react";
// import EverythingCard from "./EverythingCard";
// import Loader from "./Loader";

// function AllNews() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   function handlePrev() {
//     setPage(page - 1);
//   }

//   function handleNext() {
//     setPage(page + 1);
//   }

//   let pageSize = 15;

//   useEffect(() => {
//     setIsLoading(true);
//     setError(null);
//     fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok");
//       })
//       .then((myJson) => {
//         if (myJson.success) {
//           setTotalResults(myJson.data.totalResults);
//           setData(myJson.data.articles);
//         } else {
//           setError(myJson.message || "An error occurred");
//         }
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//         setError("Failed to fetch news. Please try again later.");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [page]);

//   return (
//     <>
//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <div className="today-header mt-8 mb-4">
//         <h3>All News</h3>
//       </div>

//       <div className="mt-16 mb-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 ">
//         {!isLoading ? (
//           data.map((element, index) => (
//             <EverythingCard
//               title={element.title}
//               description={element.description}
//               imgUrl={element.urlToImage}
//               publishedAt={element.publishedAt}
//               url={element.url}
//               author={element.author}
//               source={element.source.name}
//               key={index}
//             />
//           ))
//         ) : (
//           <Loader />
//         )}
//       </div>
//       {!isLoading && data.length > 0 && (
//         <div className="pagination flex justify-center gap-25 my-12 items-center">
//           <button
//             disabled={page <= 1}
//             className="pagination-btn text-center"
//             onClick={handlePrev}
//           >
//             &larr; Prev
//           </button>
//           <p className="font-semibold opacity-80">
//             {page} of {Math.ceil(totalResults / pageSize)}
//           </p>
//           <button
//             className="pagination-btn text-center"
//             disabled={page >= Math.ceil(totalResults / pageSize)}
//             onClick={handleNext}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// export default AllNews;

import { React, useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 15;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:3000/latest-news`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((myJson) => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="today-header mt-8 mb-4">
        <h3>Latest News</h3>
      </div>

      <div className="mt-16 mb-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 ">
        {!isLoading ? (
          data.map((element, index) => (
            <EverythingCard
              title={element.title}
              description={element.summary}
              imgUrl={element.cover_image}
              publishedAt={element.publishedAt}
              url={element.url}
              // author={element.author}
              source={element.source}
              key={index}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-25 my-12 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn text-center"
            onClick={handlePrev}
          >
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn text-center"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;

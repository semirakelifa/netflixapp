import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchurl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchurl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchurl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies &&
          movies.map((movie) => (
            <img
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              key={movie.id}
            />
          ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;


// import React, { useEffect, useState } from "react";
// import "./Banner.css";
// import axios from "axios";
// import requests from "./requests";

// function Banner() {
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(requests.fetchNetflixoriginals);
//         const movies = response.data.results;
//         const randomIndex = Math.floor(Math.random() * movies.length);
//         const selectedMovie = movies[randomIndex];
//         setMovie(selectedMovie);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const truncate = (str, n) => {
//     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
//   };

//   return (
//     <header
//       className="banner"
//       style={{
//         backgroundSize: "cover",
//         backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="banner_contents">
//         <h1 className="banner_title">
//           {movie?.title || movie?.name || movie?.original_name}
//         </h1>
//         <div className="banner_buttons">
//           <button className="banner_button">Play</button>
//           <button className="banner_button">My List</button>
//         </div>
//         <h1 className="banner_description">
//           {truncate(movie?.overview, 150)}
//         </h1>
//       </div>
//       <div className="banner_fadeBottom" />
//     </header>
//   );
// }

// export default Banner;


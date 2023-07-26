import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchurl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerurl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchurl);
        // console.log(request.data.results);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchurl]);
  const opts={
    height:"390",
    width:"100%",
    playerVars:{
        autopalay:1,
    },
  };
    // console.log(movies)

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerurl("");
    } else {
      movieTrailer(movie?.title || movie?.name )
        .then((url) => {
          const urlparams = new URLSearchParams(new URL(url).search);
          setTrailerurl(urlparams.get("v"));
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

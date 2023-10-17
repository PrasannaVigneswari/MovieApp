import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './MovieDetail.css';
import Youtube from 'react-youtube';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [trailerKey, setTrailerKey] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f7f6fac7397ee20f28e70d950a17c1d5&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        fetchMovieTrailer(data.id);
      });
  }

  const fetchMovieTrailer = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f7f6fac7397ee20f28e70d950a17c1d5&language=en-US`)
      .then(res => res.json())
      .then(data => {
        if (data.results.length > 0) {
          setTrailerKey(data.results[0].key);
        }
      });
  }

  const openYoutubeTrailer = () => {
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    }
  }

  const playTrailer = () => {
    if (trailerKey) {
      const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          cc_load_policy: 0,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        };

        return (
          <div className="movie-trailer">
            <Youtube videoId={trailerKey} opts={opts} />
          </div>
        );
      }

      // You can return default content or null here.
      return (
        <div className="no-trailer">
          Sorry, no trailer available.
        </div>
      );
    }

  return (
    <>
    <div className="movie">
      <div className="movie__intro">
      {/* {playTrailer()} */}
      {trailerKey && (
          <div className="youtube-icon youtube-button-wrapper" onClick={openYoutubeTrailer}>
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </div>
        )}
        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
        
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
              <span className="movie__voteCount">{currentMovieDetail ? `(${currentMovieDetail.vote_count} votes)` : ""}</span>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}</div>
            <div className="movie__releaseDate">{currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}</div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <span key={genre.id} className="movie__genre">
                      {genre.name}
                    </span>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div className="overview-text">{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MovieDetail;



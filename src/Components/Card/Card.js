import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

import "./Card.css";

const Card = ({ movie }) => {

  const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 


  const imgPath = "https://image.tmdb.org/t/p/original";

  return (
    isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
      <div className="cards">
        <img className="cards__img" src={`${imgPath}${movie.poster_path}`} alt={movie.original_title} />
        <div className="cards__overlay">
          <div className="card__title">{movie.original_title}</div>
          <div className="card__runtime">
            {movie.release_date}
            <span className="card__rating">
              {movie.vote_average} <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <div className="card__description">{movie.overview.slice(0, 118) + "..."}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchPage.css';
import Card from '../../Components/Card/Card';
import NotFound from '../NotFound/NotFound';

const API_KEY = 'f7f6fac7397ee20f28e70d950a17c1d5';
const GENRE_API = 'https://api.themoviedb.org/3/genre/movie/list';

const SearchPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('28'); 
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data } = await axios.get(GENRE_API, {
          params: {
            api_key: API_KEY,
          },
        });
        setGenreList(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }

    async function fetchActionMovies() {
      try {
        const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: API_KEY,
            with_genres: '28', // Genre ID for 'Action'
          },
        });
        setMovies(data.results);
        setFilteredMovies(data.results);
      } catch (error) {
        console.error('Error fetching action movies:', error);
      }
    }

    fetchGenres();
    fetchActionMovies();
  }, []);

  useEffect(() => {
    filterMoviesByGenre();
  }, [selectedGenre]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filterMoviesByGenre = () => {
    if (selectedGenre === '0') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre))
      );
      setFilteredMovies(filtered);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });
      setFilteredMovies(data.results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="centered-search-container">
          <input
            className="input"
            type="text"
            placeholder="Enter your Favorite Movie Name ..."
            value={searchKey}
            onChange={(event) => setSearchKey(event.target.value)}
            onClick={() => setShowSearchResults(true)}
          />
          {/* <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button> */}
        </div>
      </form>
      <div className="radio-container">
        <p>Filter by Genre:</p>
        {genreList.map((genre) => (
          <label key={genre.id}>
            <input
              type="radio"
              value={genre.id.toString()}
              checked={selectedGenre === genre.id.toString()}
              onChange={() => handleGenreChange(genre.id.toString())}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <div className="search-results">
        <div className="movie-list">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Card key={movie.id} movie={movie} isSearchResult={true} />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;


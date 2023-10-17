import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import MovieList from './Components/MovieList/MovieList';
import MovieDetail from './Pages/MovieDetail/MovieDetail';
import SearchPage from './Pages/SearchPage/SearchPage';
import NotFound from './Pages/NotFound/NotFound';


function App() {

  



  return (
    <div className="App">
        <Router>
          <Header />
          {/* <MovieSearchBar /> */}
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<MovieDetail/>}></Route>
                <Route path="movies/:type" element={<MovieList/>}></Route>
                
          {/* <Route path="/movies/search" component={SearchPage} /> */}
          <Route path="/movies/search" element={<SearchPage />} />

      
          <Route path="/*" element={<NotFound />}></Route>

            </Routes>
        </Router>
    </div>
  );
}

export default App;

import './App.css';
import {useState, useEffect} from 'react';
import Layout from './components/Layout'
import {Routes, Route} from 'react-router-dom'
import Home from './components/home/Home';
import Header from './components/header/Header'
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {

//wykorzystanie hooka useState do utworzenia stanu movies
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () =>{
    
    try{
      //const response = await api.get("/api/v1/movies")
      //const response = await api.get("/api/v1/movies", { headers: { 'Access-Control-Allow-Origin': '*' } });
      const response = await fetch('http://localhost:8080/api/v1/movies', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
      setMovies(data)

    }catch(err){
      console.log(err);
    }
    
  }
  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`, {mode:'cors'});
        const singleMovie = await response.json();

        setMovie(singleMovie);

        if (Array.isArray(singleMovie.reviews)) {
          setReviews(singleMovie.reviews);
        } else {
          console.error('Reviews is not an array:', singleMovie.reviews);
          // Jeśli singleMovie.reviews nie jest tablicą, możesz utworzyć nową tablicę lub zastosować inne odpowiednie rozwiązanie
          setReviews([]);
        }
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  //uruchomienie getMovies po zamontowaniu komponentu, [] oznacza że tylko raz
  useEffect(() =>{
    getMovies();
  }, []); // Dodaj pustą tablicę jako drugi argument useEffect
  
  //propertka movies={movies} przekazuje movies do komponentu Home
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Dodaj warunek sprawdzający, czy movies istnieje przed przekazaniem go do komponentu Home */}
          {movies && (
            <>
              <Route path="/" element={<Home movies={movies} />}></Route>
              <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
              <Route path="/Reviews/:movieId" element ={<Reviews getMovieData={getMovieData} 
              movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './com'

function App() {

  
  const [movies,setMovies] = useState();

  const getMovies = async () =>{
    
    try{
      //const response = await api.get("/api/v1/movies")
      const response = await fetch('http://localhost:8080/api/v1/movies', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
      setMovies(response.data)
    }catch(err){
      console.log(err);
    }

  }

  useEffect(() =>{
    getMovies();
  },[])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;

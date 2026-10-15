import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import './App.css';
import Movie from "./Components/Movie/Movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App(){
  // FIXED: Changed useEffect to useState for initializing list
  const [list, setList] = useState([]);
  
  const [wishlist, setWishlist] = useState(()=>{
    const savedWishlist = localStorage.getItem("geekmovies_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=ae722eb165ae793b746fd6275dcf3d01')
      .then(res => res.json())
      .then(data => {
        const formattedMovies = data.results.map(movie => ({
          id: movie.id.toString(),
          name: movie.title, 
          description: movie.overview, 
          img: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
          genre: "popular",
          actors: "N/A" 
        }));
        setList(formattedMovies);
      })
      .catch(err => console.error("Error fetching movies:", err));
  }, []);
  
  useEffect(()=>{
    localStorage.setItem("geekmovies_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.some(item => item.id === movie.id)) return prevWishlist;
      return [...prevWishlist, movie];
    });
  };

  const removeFromWishlist = (movieId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== movieId));
  };

  const filteredList = list.filter(movie => {
    const query = searchQuery.toLowerCase();
    if(searchBy === "genre"){
      return movie.genre.toLowerCase().includes(query);
    }
    else if(searchBy === "actors"){
      return movie.actors.toLowerCase().includes(query);
    }
    return movie.name.toLowerCase().includes(query);
  });

  return(
    <BrowserRouter>
      <div className="app-container">
        <Header onSearchChange={setSearchQuery} searchQuery={searchQuery} searchBy={searchBy} onSearchByChange={setSearchBy} />
        
        <Routes>
          <Route path="/" element={
            <div className="cemter">
              <main className="main-content">
                {filteredList.length === 0 ? (
                  <h2>No movies found</h2>
                ) : (
                  filteredList.map((movie) => (
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      img={movie.img}
                      name={movie.name}
                      description={movie.description}
                      genre={movie.genre}
                      actors={movie.actors}
                      isWishlisted={wishlist.some(item => item.id === movie.id)}
                      onAddToWishlist={addToWishlist}
                      onRemoveFromWishlist={removeFromWishlist}
                    />
                  ))
                )}
              </main>
            </div>
          } />

          <Route path="/wishlist" element={
            <div className="cemter">
              <main className="main-content">
                {wishlist.length === 0 ? (
                  <h2>Your wishlist is empty</h2>
                ) : (
                  wishlist.map((movie) => (
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      img={movie.img}
                      name={movie.name}
                      description={movie.description}
                      genre={movie.genre}
                      actors={movie.actors}
                      isWishlisted={true} 
                      onAddToWishlist={addToWishlist}
                      onRemoveFromWishlist={removeFromWishlist}
                    />
                  ))
                )}
              </main>
            </div>
          } />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
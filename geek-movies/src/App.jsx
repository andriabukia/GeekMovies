import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import './App.css';
import Movie from "./Components/Movie/Movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App(){
  const list = [
    {
      id: "1",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"not inception",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and bob marley",
      genre:"idk fantastic",
    },
    {
      id: "2", 
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"inception",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"idk fantastic",
    },
    {
      id: "3",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"naaah",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"idk fantastic",
    },
    {
      id: "4",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"bu bu",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"idk fantastic",
    },
    {
      id: "5",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"smalles violin",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"idk fantastic",
    },
    {
      id: "6",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"resident evil",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"idk fantastic",
    },
    {
      id: "7",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"inception",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"idk fantastic",
    },
    {
      id: "8",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"inception",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"idk fantastic",
    },
    {
      id: "9",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6Aal13HUFHLMJYB0XMKVlj0P6ZKN6Zi4seKOfNy2sQ&s=10",
      name:"inception",
      description:"movie about sleeping",
      actors:"margaret qualey, dicaprio, and others",
      genre:"sad",
    },
  ]

  const [wishlist, setWishlist] = useState(()=>{
    const savedWishlist = localStorage.getItem("geekmovies_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy,setSearchBy] = useState("name");

  useEffect(()=>{
    localStorage.setItem("geekmovies_wishlist", JSON.stringify(wishlist));
  },[wishlist])

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
    if(searchBy ==="genre"){
      return movie.genre.toLowerCase().includes(query)
    }
    else if(searchBy ==="actors"){
      return movie.actors.toLowerCase().includes(query)
    }
    return movie.name.toLowerCase().includes(query);
  }
    
  );

  return(
    <BrowserRouter>
      <div className="app-container">
        <Header onSearchChange={setSearchQuery} searchQuery={searchQuery} searchBy={searchBy} onSearchByChange={setSearchBy} />
        
        <Routes>
          <Route path="/" element={
            <div className="cemter">
              <main className="main-content">
                {/* Map over filteredList instead of list */}
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
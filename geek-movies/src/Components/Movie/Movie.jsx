import './Movie.css'; 
import favIcon from '../../assets/fav.png';
import checkIcon from '../../assets/checkicongud.png';
import { useState } from 'react';

function Movie({ id, img,actors, name, description, genre, onRemoveFromWishlist, onAddToWishlist }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      onRemoveFromWishlist(id); 
      setIsClicked(false);
    } else {
      onAddToWishlist({ id,actors, img, name, description, genre });
      setIsClicked(true);
    }
  };

  return (
    <div className="movie-card">
      <img src={img} alt={name} className="movie-img" />
      <div className="movie-content">
        <h2>{name}</h2>
        <p className="movie-desc">{description}</p>
        <div className="movie-footer">
          <span className="movie-genre">{genre}</span>
          <button 
            onClick={handleClick} 
            className={`watchlist-btn ${isClicked ? 'active' : ''}`}
          >
            <img src={isClicked ? checkIcon : favIcon} alt="watchlist" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movie;
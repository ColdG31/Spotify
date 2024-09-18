import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function Player({
  spotify,
  handleSearch,
  searchResults,
  isSearching,
  handleHomeClick,
  handlePlaylistClick,
  handleFavoritesClick,
  selectedPlaylist,
  view,
  addToFavorites,
  removeFromFavorites,
  favorites,
}) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar
          handleHomeClick={handleHomeClick}
          handlePlaylistClick={handlePlaylistClick}
          handleFavoritesClick={handleFavoritesClick}
        />
        <Body
          spotify={spotify}
          handleSearch={handleSearch}
          searchResults={searchResults}
          isSearching={isSearching}
          selectedPlaylist={selectedPlaylist}
          view={view}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          favorites={favorites}
        />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Player;

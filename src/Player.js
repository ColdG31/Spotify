import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function Player({ spotify, handleSearch, searchResults, isSearching, handleHomeClick, handlePlaylistClick, selectedPlaylist, view }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar handleHomeClick={handleHomeClick} handlePlaylistClick={handlePlaylistClick} />
        <Body
          spotify={spotify}
          handleSearch={handleSearch}
          searchResults={searchResults}
          isSearching={isSearching}
          selectedPlaylist={selectedPlaylist}
          view={view}
        />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Player;

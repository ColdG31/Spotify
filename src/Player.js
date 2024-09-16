// Player.js
import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function Player({ spotify, handleSearch, searchResults, isSearching }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body
          spotify={spotify}
          handleSearch={handleSearch}
          searchResults={searchResults}
          isSearching={isSearching}
        />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Player;

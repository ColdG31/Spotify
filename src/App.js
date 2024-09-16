import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useStateProviderValue } from "./StateProvider";
import { getTokenFromUrl } from "./spotify";
import "./App.css";
import Login from "./Login";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateProviderValue();
  const [searchResults, setSearchResults] = useState(null); // Correctly define searchResults state
  const [isSearching, setIsSearching] = useState(false); // Correctly define isSearching state

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getPlaylist("37i9dQZEVXcLPRN5Q4kEMB").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  const handleSearch = (query) => {
    if (query) {
      setIsSearching(true);
      spotify.search(query, ["track", "artist", "album", "playlist"]).then((results) => {
        setSearchResults(results);
      });
    } else {
      setIsSearching(false);
      setSearchResults(null);
    }
  };

  return (
    <div className="app">
      {!token && <Login />}
      {token && (
        <Player
          spotify={spotify}
          handleSearch={handleSearch}
          searchResults={searchResults}
          isSearching={isSearching}
        />
      )}
    </div>
  );
}

export default App;
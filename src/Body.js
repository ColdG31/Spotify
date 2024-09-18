import React from "react";
import "./Body.css";
import Header from "./Header";
import { useStateProviderValue } from "./StateProvider";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";

function Body({
  spotify,
  handleSearch,
  searchResults,
  isSearching,
  selectedPlaylist,
  view,
  addToFavorites,
  removeFromFavorites,
  favorites,
}) {
  const [{ discover_weekly }, dispatch] = useStateProviderValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:${id}`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playlist = view === "Home" ? discover_weekly : selectedPlaylist;

  return (
    <div className="body">
      <Header spotify={spotify} handleSearch={handleSearch} />
      {!isSearching ? (
        view === "Favorites" ? (
          <>
            <div className="body__info">
              <img src="https://via.placeholder.com/150" alt="Favorites" />
              <div className="body__infoText">
                <strong>FAVORITES</strong>
                <h2>Your Favorite Songs</h2>
                <p>Your collection of favorite songs.</p>
              </div>
            </div>
            <div className="body__songs">
              <div className="body__icons">
                <PlayCircleFilledIcon
                  className="body__shuffle"
                  onClick={() => {}}
                />
                <FavoriteIcon fontSize="large" />
                <MoreHorizIcon />
              </div>
              {favorites.map((track) => (
                <SongRow
                  key={track.id}
                  playSong={playSong}
                  track={track}
                  isFavorite={true}
                  toggleFavorite={() => removeFromFavorites(track)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="body__info">
              <img src={playlist?.images[0]?.url} alt="" />
              <div className="body__infoText">
                <strong>PLAYLIST</strong>
                <h2>{playlist?.name}</h2>
                <p>{playlist?.description}</p>
              </div>
            </div>

            <div className="body__songs">
              <div className="body__icons">
                <PlayCircleFilledIcon
                  className="body__shuffle"
                  onClick={() => playPlaylist(playlist.id)}
                />
                <FavoriteIcon fontSize="large" />
                <MoreHorizIcon />
              </div>

              {playlist?.tracks?.items.map((item) => {
                const isFavorite = favorites.some(
                  (fav) => fav.id === item.track.id
                );

                return (
                  <SongRow
                    key={item.track.id}
                    playSong={playSong}
                    track={item.track}
                    isFavorite={isFavorite}
                    toggleFavorite={() =>
                      isFavorite
                        ? removeFromFavorites(item.track)
                        : addToFavorites(item.track)
                    }
                  />
                );
              })}
            </div>
          </>
        )
      ) : (
        <div className="searchResults">
          {searchResults?.tracks?.items.map((track, index) => {
            const isFavorite = favorites.some((fav) => fav.id === track.id);
            return (
              <div key={track.id} className="searchResultRow">
                <span className="favorites">
                  {isFavorite ? (
                    <FavoriteIcon onClick={() => removeFromFavorites(track)} />
                  ) : (
                    <FavoriteBorderIcon onClick={() => addToFavorites(track)} />
                  )}
                </span>
                <p>{index + 1}</p>
                <img src={track.album.images[0]?.url} alt={track.name} />
                <div>
                  <p>{track.name}</p>
                  <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
                <p className="resultAlbum">{track.album.name}</p>
                <p className="resultDuration">3:14</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Body;

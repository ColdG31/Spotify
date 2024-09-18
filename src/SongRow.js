import React from "react";
import "./SongRow.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function SongRow({ track, playSong, isFavorite, toggleFavorite }) {
  return (
    <div className="songRow">
      <img
        className="songRow__album"
        src={track.album.images[0].url}
        alt=""
        onClick={() => playSong(track.id)}
      />
      <div className="songRow__info" onClick={() => playSong(track.id)}>
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
      <div
        className="songRow__favorite"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </div>
    </div>
  );
}

export default SongRow;

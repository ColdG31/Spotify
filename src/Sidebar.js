import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStateProviderValue } from "./StateProvider";

function Sidebar({
  handleHomeClick,
  handlePlaylistClick,
  handleFavoritesClick,
}) {
  const [{ playlists }] = useStateProviderValue();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <img
          className="sidebar__logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
        <SidebarOption Icon={HomeIcon} title="Home" onClick={handleHomeClick} />
        <SidebarOption Icon={SearchIcon} title="Search" />
        <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
        <SidebarOption
          Icon={FavoriteIcon}
          title="Favorites"
          onClick={handleFavoritesClick}
        />
        <br />
        <strong className="sidebar__title">PLAYLISTS</strong>
        <hr />
        {playlists?.items?.map((playlist) => (
          <SidebarOption
            key={playlist.id}
            title={playlist.name}
            onClick={() => handlePlaylistClick(playlist.id)}
          />
        ))}
      </div>
    </>
  );
}

export default Sidebar;

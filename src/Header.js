// Header.js
import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { useStateProviderValue } from "./StateProvider";

function Header({ spotify, handleSearch }) {
  const [{ user }] = useStateProviderValue();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchInput(e)}
          style={{
            outline: "none",
          }}
        />
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;

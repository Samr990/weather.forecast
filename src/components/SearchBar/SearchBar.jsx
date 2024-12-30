import "./SearchBar.css";
import search_icon from "../../assets/search_icon.png";

function SearchBar() {
  return (
    <div className="search">
      <input type="text" placeholder="Enter location" />
      <img
        src={search_icon}
        alt=""
        onClick={() => search(weatherData.location)}
      />
    </div>
  );
}

export default SearchBar;

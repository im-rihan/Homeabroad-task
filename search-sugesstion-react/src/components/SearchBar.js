import { Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [input, setInput] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
      )
        .then((res) => res.json())
        .then((result) => setData(result))
        .then((err) => console.log(err.message));
    };
    fetchData();
  }, []);

  const handleFilter = () => {};
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search City Name"
          value={input}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          <Search />
        </div>
      </div>

      <div className="dataResult">
        {/* {data.map((value) => {
          return (
            <div className="dataItem" key={value.rank}>
              <p>{value.city}</p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}

export default SearchBar;

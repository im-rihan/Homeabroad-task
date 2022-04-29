import { Close, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
      )
        .then((res) => res.json())
        .then((result) => setData(result))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setInput(searchWord);
    const newFilter = data.filter((value) => {
      return value.city.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord.length >= 4) {
      setFilteredData(newFilter);
    } else {
      setFilteredData([]);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setInput("");
  };

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
          {filteredData.length === 0 ? (
            <Search />
          ) : (
            <Close id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>

      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value) => {
            return (
              <div className="dataItem" key={value.rank}>
                <p>{value.city}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

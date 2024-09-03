import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpeg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (query) GetSearches();
  }, [query]);

  return (
    <div className="relative w-1/2 flex ml-20 mb-5 items-center p-2 md:p-4 mt-5 mr-3 rounded-lg bg-zinc-800">
      <i className="text-zinc-400 text-xl md:text-2xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="flex-1 mx-2 md:mx-4 p-1 md:p-2 text-zinc-200 bg-transparent border-none outline-none rounded-md text-xs md:text-sm"
        type="text"
        placeholder="Search anything"
      />
      {query && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-xl md:text-2xl ri-close-fill cursor-pointer"
        ></i>
      )}
      {query && (
        <div className="absolute top-full left-0 w-full z-10 max-h-[50vh] bg-zinc-900 text-zinc-200 overflow-auto rounded-md shadow-lg mt-2">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="flex items-center p-2 hover:bg-zinc-700 duration-300 text-xs md:text-sm"
            >
              <img
                className="w-12 h-12 md:w-16 md:h-16 object-cover rounded mr-2"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                    : noimage
                }
                alt=""
              />
              <span className="truncate">{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;

import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full h-full px-4 sm:px-6 lg:px-8 bg-[#1F1E24] mt-8 overflow-x-hidden">
      <Link
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="fixed bottom-4 right-4 flex justify-center items-center w-12 h-12 bg-[#d42525] rounded-full shadow-lg hover:bg-[#c12424] transition duration-300 ease-in-out"
      >
        <i className="text-white z-10 ri-arrow-up-line text-xl"></i>
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-10">
        {data.map((c, i) => (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            className="relative w-[90%] bg-[#2b2b2b] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            key={i}
          >
            <div className="relative w-full h-0 pb-[150%]">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={
                  c.poster_path || c.backdrop_path || c.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        c.poster_path || c.backdrop_path || c.profile_path
                      }`
                    : noimage
                }
                alt={c.name || c.title || c.original_name || c.original_title}
              />
            </div>
            <div className="p-2 sm:p-3 md:p-4">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300 font-semibold truncate">
                {c.name || c.title || c.original_name || c.original_title}
              </h1>

              {c.vote_average && (
                <div className="absolute right-3 bottom-3 rounded-full text-xs sm:text-sm md:text-base lg:text-base font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
                  {(c.vote_average * 10).toFixed()}%
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;

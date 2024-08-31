import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const HorizontalCards = ({ data, title }) => {
  return (
    <div className="w-full flex overflow-y-hidden mb-5 p-5 space-x-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type || title}/details/${d.id}`}
            key={i}
            className="min-w-[60%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[20%] xl:min-w-[15%] h-[30vh] md:h-[35vh] lg:h-[40vh] bg-zinc-900 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-zinc-800"
          >
            <img
              className="w-full h-[55%] object-cover rounded-t-lg"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
            <div className="text-white p-4 h-[45%] flex flex-col justify-between">
              <h1 className="text-md md:text-lg font-bold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-sm md:text-base text-zinc-400 mt-2">
                {d.overview.slice(0, 25)}...
                <span className="text-blue-400"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center w-full">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;

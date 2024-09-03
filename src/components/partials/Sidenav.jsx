import React, { useState } from "react";
import { Link } from "react-router-dom";
import movie from "../../assets/movie.gif";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-full">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white text-3xl p-4 fixed top-2 left-4 z-50"
      >
        {isOpen ? (
          <i className="ri-close-line"></i>
        ) : (
          <i className="ri-menu-line"></i>
        )}
      </button>

      <div
        className={`fixed top-0 left-0 w-full md:w-[70%] lg:w-[20%] h-full bg-zinc-900 border-r-2 border-zinc-400 p-10 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:overflow-visible`}
      >
        <h1 className="text-2xl text-white font-bold flex items-center mb-10">
          <img
            src={movie}
            alt="Movie Icon"
            className="inline-block mr-2 w-8 h-8"
          />
          <span className="text-2xl">ScreenEclipse</span>
        </h1>

        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl">New Feeds</h1>
          <Link
            to="/trending"
            className="hover:bg-[#D42525] hover:text-white duration-300 rounded-lg p-2"
          >
            <i className="ri-fire-fill"></i> Trending
          </Link>
          <Link
            to="/popular"
            className="hover:bg-[#D42525] hover:text-white duration-300 rounded-lg p-2"
          >
            <i className="ri-bard-fill"></i> Popular
          </Link>
          <Link
            to="/movie"
            className="hover:bg-[#D42525] hover:text-white duration-300 rounded-lg p-2"
          >
            <i className="ri-movie-2-fill"></i> Movies
          </Link>
          <Link
            to="/tv"
            className="hover:bg-[#D42525] hover:text-white duration-300 rounded-lg p-2"
          >
            <i className="ri-tv-2-fill"></i> TV Shows
          </Link>
          <Link
            to="/person"
            className="hover:bg-[#D42525] hover:text-white duration-300 rounded-lg p-2"
          >
            <i className="ri-team-fill"></i> People
          </Link>
        </nav>
        <hr className="border-none h-[1px] bg-zinc-400 my-5" />
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl">Website Information</h1>
          <Link className="hover:bg-[#D42525] hover:text-white duration-300 rounded-lg p-2">
            <i className="ri-information-fill"></i> About Us
          </Link>
          <Link className="hover:bg-[#D42525] hover:text-white duration-300 rounded-lg p-2">
            <i className="ri-phone-fill"></i> Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidenav;

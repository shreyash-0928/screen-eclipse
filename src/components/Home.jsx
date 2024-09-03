import { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "ScreenEclipse | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetTrending();
    if (!wallpaper) GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex overflow-hidden">
      <Sidenav />
      <div className="flex-1 ml-0 lg:ml-[20%] transition-all duration-300 overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="p-5 flex flex-col md:flex-row items-start justify-between">
          <h1 className="text-3xl font-semibold text-zinc-400 mb-4 md:mb-0">
            Trending
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;

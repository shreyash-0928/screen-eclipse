import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import noimage from "/noimage.jpeg";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const TvDetails = () => {
  document.title = "ScreenEclipse | Tv Show Details";
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative min-h-screen w-screen overflow-auto"
    >
      {/* Part 1: Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-4 sm:gap-10 text-lg sm:text-xl px-4 sm:px-[10%]">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#d42525] ri-arrow-left-line"
        ></Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={info.detail.homepage}
        >
          <i className="hover:text-[#d42525] ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-[#d42525] ri-earth-fill"></i>
        </a>
        <a
          className="hover:text-[#f49f27]"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2: Poster and details */}
      <div className="w-full flex flex-col sm:flex-row gap-6 px-4 sm:px-[10%]">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] sm:h-[50vh] w-full sm:w-auto object-cover rounded"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt={info.detail.title || info.detail.name}
        />

        <div className="content text-white">
          <h1 className="text-3xl md:text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl md:text-2xl font-bold text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="rounded-full text-lg sm:text-xl font-semibold bg-yellow-600 text-white w-[5vh] sm:w-[6vh] h-[5vh] sm:h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-auto font-semibold text-xl sm:text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-lg sm:text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-lg md:text-2xl mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-lg sm:text-2xl mb-3 mt-5">Tv Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>

          <Link
            className="p-3 sm:p-5 bg-[#d42525] rounded-lg inline-block"
            to={`${pathname}/trailer`}
          >
            <i className="text-lg sm:text-xl ri-play-fill mr-2 sm:mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3: Available on Platforms */}
      <div className="w-full sm:w-[80%] flex flex-col gap-y-5 mt-10 px-4 sm:px-[10%]">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-white">
            <h1>Available on Platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4: Seasons */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl md:text-3xl font-bold text-white">Seasons</h1>
      <div className="w-full flex overflow-x-scroll mb-5 p-5 gap-10">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div
              key={i}
              className="w-40 md:w-[15vh] flex-shrink-0 snap-center scroll-ml-6"
            >
              <img
                className="shadow-lg min-w-[40vw] md:min-w-[14vw] h-56 md:h-[30vh] object-cover rounded-lg"
                src={
                  s.poster_path
                    ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                    : noimage
                }
                alt={s.name}
              />
              <h1 className="text-lg md:text-2xl text-zinc-300 mt-3 font-semibold truncate">
                {s.name}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-2xl md:text-3xl mt-5 text-white font-black text-center w-full">
            Nothing to show
          </h1>
        )}
      </div>

      {/* Part 5: Recommendations and Similar Stuff */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl sm:text-3xl font-bold text-white px-4 sm:px-[10%]">
        Recommendations & Similar stuff
      </h1>
      <div className="px-4 sm:px-[10%]">
        <HorizontalCards
          title="tv"
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;

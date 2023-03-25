import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  handlePause,
  handlePlay,
}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt={song.title}
          className="w-20 h-20 rounded-lg"
        />
        <div className="flex flex-1 flex-col mx-3 justify-center">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song.artists[0].adamid}`}>
            <p className="text-base text-gray-300">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePause}
        handlePlay={handlePlay}
        song={song}
      />
    </div>
  );
};

const TopPlay = () => {
  useEffect(() => divRef.current.scrollIntoView({ behaviour: "smooth" }));
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  const topPlays = data?.tracks?.slice(0, 5);
  {
    console.log(topPlays);
  }
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    //console.log("click");
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link>
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => {
            return (
              <TopChartCard
                song={song}
                i={i}
                key={song.key}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link>
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => {
            return (
              <SwiperSlide
                key={song.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song.artists[0].adamid}`}>
                  <img
                    src={song?.images.background}
                    alt="name"
                    className="rounded-full object-cover w-full"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;

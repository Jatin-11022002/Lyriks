import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;
  console.log(data);
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-white text-3xl font-bold text-left">Discover</h2>
        <select
          onChange={() => {}}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg sm:mt-0 mt-5 outline-none"
          value=""
        >
          {genres.map((genre) => {
            return (
              <option value={genre.value} key={genre.value}>
                {genre.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks.map((song, i) => {
          return (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Discover;

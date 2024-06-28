import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMoviesDetail = ({ id }) => {
  return api.get(`/movie/${id}`);
};

export const useMovieDetailQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-Detail", id],
    queryFn: () => fetchMoviesDetail({ id }),
    select: (result) => result.data,
  });
};

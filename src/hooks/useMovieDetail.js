import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

//영화 디테일 정보 쿼리
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

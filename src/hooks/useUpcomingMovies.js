import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
//영화 개봉예정 정보 쿼리
const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    suspense: true,
    select: (result) => result.data,
  });
};

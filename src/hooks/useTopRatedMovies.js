import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
//높은 평점 영화 정보 쿼리
const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top_rated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
//영화 리뷰 정보 쿼리
const fetchMoviesReviews = ({ id }) => {
  return api.get(`/movie/${id}/reviews`);
};

export const useMovieReviewsQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-reviews", id],
    queryFn: () => fetchMoviesReviews({ id }),
    select: (result) => result.data.results,
  });
};

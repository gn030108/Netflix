import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider title="Top Rated Movies" movies={data.results} responsive={responsive} />
    </div>
  );
};

export default TopRatedMovieSlide;

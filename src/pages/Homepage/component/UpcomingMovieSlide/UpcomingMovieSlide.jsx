import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider title="Upcoming Movies" movies={data.results} responsive={responsive} />
    </div>
  );
};

export default UpcomingMovieSlide;

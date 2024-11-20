import { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import MovieCard from "./../../common/MovieCard/MovieCard";
import Pagination from "../../common/Pagination/Pagination";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import "./MoviePage.style.css";
import DropDown from "../../common/DropDown/DropDown";

const MoviePage = () => {
  const [sort, setSort] = useState("Select"); // 정렬 기능
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");
  const { data: genreData } = useMovieGenreQuery(); // 영화 장르 데이터
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const handleSearch = () => {
    setQuery({ q: searchWord });
    setSearchWord("");
  };
  // 장르 필터링 기능
  const handleGenreClick = (id) => {
    //장르 선택 및 해제
    if (selectedGenre.includes(id)) {
      setSelectedGenre(selectedGenre.filter((g) => g !== id));
    } else {
      setSelectedGenre([...selectedGenre, id]);
    }
    setSort("Select");
  };
  let filteredMovies = data?.results;
  //장르 선택시 영화 필터링 후 출력
  if (selectedGenre.length > 0) {
    filteredMovies = data?.results.filter((movie) =>
      movie.genre_ids.some((genreId) => selectedGenre.includes(genreId))
    );
  }
  //인기순 정렬 및 역정렬
  if (sort === "Popularity(Desc)") {
    filteredMovies = filteredMovies.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === "Popularity(Asc)") {
    filteredMovies = filteredMovies.sort((a, b) => a.popularity - b.popularity);
  }
  console.log(filteredMovies);

  //로딩시 스피너 출력
  if (isLoading) {
    return (
      <Spinner
        animation="border"
        variant="danger"
        style={{
          width: "5rem",
          height: "5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <div className="select_box">
            <div className="search_box">
              <input
                type="text"
                placeholder="Search"
                value={searchWord}
                onChange={(event) => setSearchWord(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <Button variant="outline-danger" onClick={handleSearch}>
                Search
              </Button>
            </div>
            {selectedGenre &&
              selectedGenre.map((item, index) => (
                <Badge
                  onClick={() => handleGenreClick(item.id)}
                  bg="secondary"
                  className="genre_badge"
                  key={index}
                >
                  {item.name}
                </Badge>
              ))}

            <div style={{ paddingBottom: "1rem" }}>
              <div className="Genre mt-1 mb-4">Genre</div>
              <div className="genre_box">
                {genreData?.map((genre, index) => (
                  <Badge
                    onClick={() => handleGenreClick(genre.id)}
                    bg={selectedGenre.includes(genre.id) ? "secondary" : "dark"}
                    className="genre_badge"
                    key={index}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
              <div className="Genre">Sorts</div>
              <DropDown sort={sort} setSort={setSort} />
            </div>
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {filteredMovies.length === 0 ? (
              <div className="None">
                <div>No movies found for the selected genre</div>
              </div>
            ) : (
              filteredMovies.map((movie, index) => (
                <Col
                  key={index}
                  lg={4}
                  md={4}
                  sm={6}
                  xs={9}
                  className="MovieList"
                >
                  <MovieCard movie={movie} />
                </Col>
              ))
            )}
          </Row>
          {data.total_results === 0 && (
            <div className="None">
              <div>No movies found for the selected genre</div>
            </div>
          )}

          <div className="PageNation">
            <Pagination
              page={page}
              displayPage={5} //보여줄 페이지 갯수
              totalPage={data.total_pages}
              setPage={setPage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;

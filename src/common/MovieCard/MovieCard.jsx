import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import IMDB from "../../images/IMDB.jpg";
import over from "../../images/19.png";
import under from "../../images/All.png";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: genreData } = useMovieGenreQuery();
  const { data: videoData } = useMovieVideoQuery({ id: movie.id });

  const youtubeVideo = videoData?.find(
    (video) => video.site === "YouTube" && video.type === "Teaser"
  );

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  const goMovieDetailPage = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w220_and_h330_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie_card"
      onClick={goMovieDetailPage}
    >
      <div className="overlay p-2">
        <div className="p-2">
          <h3
            className="fw-bold pt-5"
            style={{ borderBottom: "2px solid white" }}
          >
            {movie.title}
          </h3>
        </div>
        {showGenre(movie.genre_ids).map((genre, index) => (
          <Badge bg="danger" className="me-1" key={index}>
            {genre}
          </Badge>
        ))}
        <div className="m-1 mt-2">
          <img width={18} className="me-1" src={IMDB} alt="IMDB" />
          {movie.popularity}
          {movie.adult ? (
            <img width={18} className="ms-2" src={over} alt="19over" />
          ) : (
            <img width={18} className="ms-2" src={under} alt="19under" />
          )}
        </div>
        <div className="video_btn">
          {youtubeVideo && (
            <button
              type="button"
              className="btn btn-dark"
              onClick={(event) => {
                event.stopPropagation();
                handleOpenModal();
              }}
            >
              Watch Trailer
            </button>
          )}
        </div>

        {open && youtubeVideo && (
          <VideoPlayer videoKey={youtubeVideo.key} close={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default MovieCard;

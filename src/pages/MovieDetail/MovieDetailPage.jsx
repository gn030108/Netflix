import React, { useState } from "react";
import { Alert, Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";
import VideoPlayer from "../../common/VideoPlayer/VideoPlayer";
import MovieReview from "./component/MovieReview/MovieReview";
import "./MovieDetailPage.style.css";
const MovieDetailPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  const { data: reviewData } = useMovieReviewsQuery({ id });
  const { data: genreData } = useMovieGenreQuery();
  const { data: videoData } = useMovieVideoQuery({ id });

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((item) => {
      const genreObj = genreData.find((genre) => genre.id === item.id);
      return genreObj.name;
    });
    return genreNameList;
  };

  const youtubeVideo = videoData?.find(
    (video) => video.site === "YouTube" && video.type === "Teaser"
  );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

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
    <>
      {showModal && youtubeVideo && (
        <VideoPlayer videoKey={youtubeVideo.key} close={handleCloseModal} />
      )}
      <Container>
        <Row className="mt-5">
          <Col lg={6} xs={12}>
            <div className="imgBox">
              <img
                src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                className="mainImg"
                alt="poster"
              ></img>
            </div>
          </Col>
          <Col lg={6} xs={12}>
            {showGenre(data.genres).map((genre, index) => (
              <Badge bg="danger" className="me-1 mt-4 genre" key={index}>
                {genre}
              </Badge>
            ))}

            <div className="mt-4 title">{data.title}</div>
            <h2 className="mt-4">{data.tagline}</h2>
            <h5 className="mt-4 overview">{data.overview}</h5>
            <div>
              <Row className="rated">
                <div className="col-4">
                  <Badge bg="danger" className="rated_badge">
                    Average
                  </Badge>
                </div>
                <div className="col-8">{data.vote_average}</div>
              </Row>
              <Row className="rated">
                <div className="col-4">
                  <Badge bg="danger" className="rated_badge">
                    Popularity
                  </Badge>
                </div>
                <div className="col-8">{data.popularity}</div>
              </Row>
              <Row className="rated">
                <div className="col-4">
                  <Badge bg="danger" className="rated_badge">
                    Release Date
                  </Badge>
                </div>
                <div className="col-8">{data.release_date}</div>
              </Row>
              <Row className="rated">
                <div className="col-4">
                  <Badge bg="danger" className="rated_badge">
                    revenue
                  </Badge>
                </div>
                <div className="col-8">{data.revenue}</div>
              </Row>
              <Row className="rated">
                <div className="col-4">
                  <Badge bg="danger" className="rated_badge">
                    runtime
                  </Badge>
                </div>
                <div className="col-8">{data.runtime}min</div>
              </Row>
              <Row className="rated">
                <div className="col-4">
                  <Badge bg="danger" className="rated_badge">
                    Released
                  </Badge>
                </div>
                <div className="col-8">{data.status}</div>
              </Row>
            </div>
            {youtubeVideo && (
              <Row className="mt-5">
                <button
                  type="button"
                  className="btn btn-dark trailer_btn"
                  onClick={handleOpenModal}
                >
                  Watch Trailer
                </button>
              </Row>
            )}
          </Col>
        </Row>
        <Row className="mt-5">
          <h2 className="mb-5">Reviews</h2>
          {reviewData?.length === 0 && (
            <div className="none">There are no reviews for this movie</div>
          )}
          {reviewData?.map((review, index) => (
            <MovieReview review={review} key={index} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MovieDetailPage;

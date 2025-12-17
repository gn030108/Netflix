import { Spinner } from "react-bootstrap";
import Banner from "./component/Banner/Banner";
import PopularMovieSlide from "./component/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./component/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./component/UpcomingMovieSlide/UpcomingMovieSlide";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

//1. 베너 => popular영화를 들고와서 첫번째 아이템
//2. popular movie

const HomePage = () => {
  // Banner.jsx
  const Banner = () => {
    throw new Error("테스트 에러");
    return <div>Banner</div>;
  };

  return (
    <div>
      <ErrorBoundary
        fallback={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h3 className="mb-3">
              일시적인 오류가 발생했습니다. <br />
              페이지를 새로고침 해주세요.
            </h3>
            <button
              type="button"
              className="btn btn-dark btn-lg"
              size="lg"
              onClick={() => {
                window.location.reload();
              }}
            >
              새로고침
            </button>
          </div>
        }
      >
        <Suspense
          fallback={
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
          }
        >
          <Banner />
          <div className="px-5">
            <PopularMovieSlide /> {/*인기 영화 목록*/}
            <TopRatedMovieSlide />
            {/*점수 높은 영화 목록*/}
            <UpcomingMovieSlide />
            {/*출시 예정 영화 목록*/}
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;

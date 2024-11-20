import React from "react";
import Banner from "./component/Banner/Banner";
import PopularMovieSlide from "./component/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./component/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./component/UpcomingMovieSlide/UpcomingMovieSlide";

//1. 베너 => popular영화를 들고와서 첫번째 아이템
//2. popular movie

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className="px-5">
        <PopularMovieSlide /> {/*인기 영화 목록*/}
        <TopRatedMovieSlide />
        {/*점수 높은 영화 목록*/}
        <UpcomingMovieSlide />
        {/*출시 예정 영화 목록*/}
      </div>
    </div>
  );
};

export default HomePage;

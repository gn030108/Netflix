import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./layout/AppLayout";
import { Spinner } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// 🔥 페이지 단위 lazy 로딩
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const MoviePage = lazy(() => import("./pages/Movies/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetail/MovieDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

// 공통 로딩 UI
const Loading = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner animation="border" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />

          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

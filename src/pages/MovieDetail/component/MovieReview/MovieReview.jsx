import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./MovieReview.style.css";
const MovieReview = ({ review }) => {
  const [openContent, setOpenContent] = useState(true);
  const [height, setHeight] = useState(null);
  const [more, setMore] = useState(true);
  const reviewContent = useRef();

  useEffect(() => {
    const check = () => {
      if (reviewContent.current) {
        if (reviewContent.current.clientHeight <= 60) {
          setMore(false);
        }
        setHeight(reviewContent.current.clientHeight);
        console.log(reviewContent.current.clientHeight);
      }
    };
    check();
    setOpenContent(false);
    console.log("hhh", height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="review-box">
      <Col className="author" lg={3} xs={12}>
        {review.author}
      </Col>
      <Col lg={9} xs={12} className="content_layout">
        {more ? (
          <div
            className={`content `}
            style={{ maxHeight: openContent ? `${height}px` : "60px" }}
            ref={reviewContent}
          >
            {review.content}
          </div>
        ) : (
          <div className="content">{review.content}</div>
        )}
        {more && (
          <div className="open_btn">
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => setOpenContent(!openContent)}
            />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MovieReview;

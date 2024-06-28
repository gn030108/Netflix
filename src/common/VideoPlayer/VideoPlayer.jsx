import "./VideoPlayer.style.css";

const VideoPlayer = ({ videoKey, close }) => {
  return (
    <div className="modal_layout">
      <div className="top pb-3">
        {/* <div className="title">Trailer</div> */}
        <button
          className="close-btn"
          onClick={(event) => {
            event.stopPropagation();
            close();
          }}
        >
          &times;
        </button>
      </div>

      <div className="video-box">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Trailer"
          className="iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;

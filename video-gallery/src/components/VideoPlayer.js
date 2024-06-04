import React from 'react';
//import { useParams} from 'react-router-dom';
import '../App.css'; // Ensure this file contains relevant styles
import { useLocation, Link }  from 'react-router-dom';



const VideoPlayer = () => {
  //const { videoId } = useParams();
  const location = useLocation();
  const { video } = location.state || {};
  if (!video) {
    return <div>No video selected</div>;
  }
  
  return (
    <div className="video-player-container">
      
      <Link to="/" className="home-button">Home</Link>
      <Link to={`/channel/${video.snippet.channelId}`} className="back-button">Back</Link>
      <div className="video-responsive">
        <iframe 
          src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
        <h2>{video.snippet.title}</h2>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;

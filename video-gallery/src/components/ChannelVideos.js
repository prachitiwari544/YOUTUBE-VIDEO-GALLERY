import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { fetchChannelVideos } from '../YoutubeAPI';
import '../App.css';

const ChannelVideos = () => {
  const { channelId} = useParams();
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [nextPageToken, setNextPageToken] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try{
      const response = await fetchChannelVideos(channelId);
      setVideos(response.videos);
      setChannel(response.channel);
      setNextPageToken(response.nextPageToken || '');
      }catch (err) {
        console.error('Error fetching channel videos:', err);
      }
    };
    fetchVideos();
  }, [channelId]);

  const loadMoreVideos = async () => {
    if (nextPageToken) {
      const response = await fetchChannelVideos(channelId, nextPageToken);
      setVideos((prevVideos) => [...prevVideos, ...response.videos]);
      setNextPageToken(response.nextPageToken || '');
    }
  };

   const handleHomeButtonClick = () => {
    navigate('/');
  };

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id.videoId}`, { state: { video } });
  };

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <div>
      
      <button onClick={handleHomeButtonClick} className="home-button">Home</button>
      {channel && (
        <div className="channel-header">
          <h1>{channel.snippet.title}</h1>
        </div>
      )}
      <ul className="video-grid">
        {videos.map((video) => {
          const thumbnailUrl = video.snippet.thumbnails?.high?.url ||
                               video.snippet.thumbnails?.medium?.url ||
                               video.snippet.thumbnails?.default?.url ;
                               

          return (
            <li key={video.id.videoId}
              onClick={() => handleVideoClick(video)}>
              <img className="channel-video-img"
                src={thumbnailUrl}
                alt="Video Thumbnail"
              />
              <h2 className="title-video">{video.snippet.title}</h2>
              <p>{timeSince(video.snippet.publishedAt)}</p>
            </li>
          );
        })}
      </ul>
          
      {nextPageToken && (
        <button  className="load-more-button" onClick={loadMoreVideos}>Load More Videos</button>
      )}
    </div>
  );
};

export default ChannelVideos;

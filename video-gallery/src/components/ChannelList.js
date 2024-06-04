// src/components/ChannelList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ChannelList = React.memo(({ channels }) => {
    return (
      <div>
        <h1> Best Programming Channels</h1>
        <ul className="channel-grid">
          {channels.map((channel) => {
            const thumbnailUrl = channel.snippet.thumbnails?.high?.url ||
            channel.snippet.thumbnails?.medium?.url ||
            channel.snippet.thumbnails?.default?.url;
            return(
            <li key={channel.id}>
             <Link to={`/channel/${channel.id}`}>
              <img  className="channelImage" src={thumbnailUrl} alt="Channel Thumbnail" />
              </Link>
              <div>
                <h2 className="title">{channel.snippet.title}</h2>
                
              </div>
            </li>
          )})}
        </ul>
      </div>
    );
  });
export default ChannelList;



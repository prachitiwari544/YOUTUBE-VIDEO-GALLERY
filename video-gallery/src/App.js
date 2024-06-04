// src/App.js
import React from 'react';
import ChannelList from './components/ChannelList';
import ChannelVideos from './components/ChannelVideos'
import { fetchChannels } from './YoutubeAPI';
import VideoPlayer from './components/VideoPlayer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { useState, useEffect, useMemo} from 'react';

const App = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannelData = async () => {
      const channelIds = [ 'UC8butISFwT-Wl7EV0hUK0BQ', 'UCBJycsmduvYEL83R_U4JriQ', 'UCWv7vMbMWH4-V0ZXdmDpPBA', 'UCeVMnSShP_Iviwkknt83cww', 'UCXgGY0wkgOzynnHvSEVmE3A', 'UCkGS_3D0HEzfflFnG0bD24A', 'UCBwmMxybNva6P_5VmxjzwqA', 'UCM-yUTYGmrNvKOCcAl21g3w', 'UCc5FkTYiWH5L3Gk5IyW6Rmw', 'UCs6nmQViDpUw0nuIx9c_WvA', 'UCJbPGzawDH1njbqV-D5HqKw'];
      const fetchedChannels = await fetchChannels(channelIds);
      setChannels(fetchedChannels);
    };
    fetchChannelData();
  }, []);
  
  const memoizedChannels = useMemo(() => channels, [channels]);

  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path="/" element={<ChannelList channels={memoizedChannels} />} />
          <Route path="/channel/:channelId" element={<ChannelVideos />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />
          <Route path="/" element={<ChannelList />} />
        </Routes>
    </div>
    </Router>
  );
};
                       
export default App;

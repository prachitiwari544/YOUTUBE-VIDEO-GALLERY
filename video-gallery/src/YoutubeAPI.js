// src/YouTubeAPI.js
import axios from 'axios';
import { getCache, setCache } from './cache';

const API_KEY = 'AIzaSyC6S-3huagJi_ruv9YXIxvLnPhMrgpA3ek';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';


// Update fetchChannels function in YouTubeAPI.js to fetch additional channel data
export const fetchChannels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/channels`, {
        params: {
          part: 'snippet',
          id: 'UC8butISFwT-Wl7EV0hUK0BQ,UCWv7vMbMWH4-V0ZXdmDpPBA,UCeVMnSShP_Iviwkknt83cww,UCXgGY0wkgOzynnHvSEVmE3A,UCkGS_3D0HEzfflFnG0bD24A,UCBwmMxybNva6P_5VmxjzwqA,UCM-yUTYGmrNvKOCcAl21g3w,UCc5FkTYiWH5L3Gk5IyW6Rmw,UCs6nmQViDpUw0nuIx9c_WvA,UCJbPGzawDH1njbqV-D5HqKw',
          key: API_KEY,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching channel data from YouTube API', error);
      return [];
    }
  };
  

  export const fetchChannelVideos = async (channelId,pageToken='') => {
  const cacheKey = `${channelId}-${pageToken}`;
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

    try {
      const responsevideo = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: 'snippet',
          channelId,
          maxResults:10,
          pageToken,
          order: 'date',
          key: API_KEY,
        },
      });
      const responsechannel = await axios.get(`${BASE_URL}/channels`, {
        params: {
          part: 'snippet',
          id: channelId,
          key: API_KEY,
        },
      });
      const result = {
        videos: responsevideo.data.items,
        channel: responsechannel.data.items[0],
        nextPageToken: responsevideo.data.nextPageToken
    };
     
     setCache(cacheKey, result);
     return result;

   }catch (error) {
      console.error('Error fetching channel videos', error);
      return {items:[]};
    }
  };

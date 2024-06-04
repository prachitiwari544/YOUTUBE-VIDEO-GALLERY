// src/cache.js

const cache = new Map();

export const getCache = (key) => {
  return cache.get(key);
};

export const setCache = (key, data) => {
  cache.set(key, data);
};

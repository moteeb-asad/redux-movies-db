// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3/',
  IMAGE_BASE_URL: 'https://www.themoviedb.org/t/p/w220_and_h330_face',
  API_KEY: process.env.REACT_APP_TMDB_API_KEY,
};

// Application Status
export const STATUSES = {
  LOADING: 'loading',
  IDLE: 'idle',
  ERROR: 'error',
};

// Media Types
export const MEDIA_TYPES = {
  MOVIE: 'movie',
  TV: 'tv',
  ALL: 'all',
};

// Default Values
export const DEFAULTS = {
  ITEMS_PER_PAGE: 20,
  MAX_TITLE_LENGTH: 18,
  SKELETON_COUNT: 20,
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: '768px',
  TABLET: '1024px',
  DESKTOP: '1200px',
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
};

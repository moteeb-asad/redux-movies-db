import { DEFAULTS } from '../constants';

/**
 * Extract year from date string
 * @param {string} fullDate - Date string
 * @returns {number} Year
 */
export const getFullYear = fullDate => {
  if (!fullDate) return null;
  const date = new Date(fullDate);
  return date.getFullYear();
};

/**
 * Truncate movie title to specified length
 * @param {string} movieTitle - Movie title
 * @param {number} maxLength - Maximum length (default: 18)
 * @returns {string} Truncated title
 */
export const getShortMovieTitle = (
  movieTitle,
  maxLength = DEFAULTS.MAX_TITLE_LENGTH
) => {
  if (!movieTitle) return '';

  return movieTitle.length > maxLength
    ? `${movieTitle.substring(0, maxLength)}...`
    : movieTitle;
};

/**
 * Get movie title (handles both movie and TV show titles)
 * @param {Object} movie - Movie object
 * @returns {string} Movie title
 */
export const getMovieTitle = movie => {
  return movie.title || movie.name || 'Unknown Title';
};

/**
 * Get movie release date (handles both movie and TV show dates)
 * @param {Object} movie - Movie object
 * @returns {string} Release date
 */
export const getMovieDate = movie => {
  return movie.release_date || movie.first_air_date;
};

/**
 * Calculate vote percentage
 * @param {number} voteAverage - Vote average (0-10)
 * @returns {number} Vote percentage (0-100)
 */
export const getVotePercentage = voteAverage => {
  return Math.round(voteAverage * 10);
};

/**
 * Get poster image URL
 * @param {string} posterPath - Poster path
 * @param {string} fallbackImage - Fallback image path
 * @returns {string} Image URL
 */
export const getPosterUrl = (posterPath, fallbackImage) => {
  if (!posterPath) return fallbackImage;
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = num => {
  return num?.toLocaleString() || '0';
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

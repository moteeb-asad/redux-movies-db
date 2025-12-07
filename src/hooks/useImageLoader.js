import { useState, useCallback } from 'react';

/**
 * Custom hook for handling image loading states
 * @param {number} totalImages - Total number of images to load
 * @returns {Object} Image loading state and handlers
 */
export const useImageLoader = (totalImages = 0) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = useCallback(imageId => {
    setLoadedImages(prev => ({ ...prev, [imageId]: true }));
    setImagesLoaded(prevCount => prevCount + 1);
  }, []);

  const resetImageLoader = useCallback(() => {
    setLoadedImages({});
    setImagesLoaded(0);
  }, []);

  const isImageLoaded = useCallback(
    imageId => {
      return loadedImages[imageId] || false;
    },
    [loadedImages]
  );

  const allImagesLoaded = imagesLoaded === totalImages;

  return {
    loadedImages,
    imagesLoaded,
    handleImageLoad,
    resetImageLoader,
    isImageLoaded,
    allImagesLoaded,
  };
};

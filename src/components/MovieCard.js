import { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Button,
  useMediaQuery,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Link as ChakraLink,
} from '../lib/chakra';

import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setClickedMovie,
  fetchMovies,
  fetchByLoadMore,
} from '../store/moviesSlice';
import MovieCardSkeleton from './MovieCardSkeleton';

function Movies({ currentItems, flexWidth }) {
  const [isMobile] = useMediaQuery('(max-width: 800px)');
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const dispatch = useDispatch();

  // reset imagesLoaded when items change to replay the loading state
  useEffect(() => {
    setImagesLoaded(0);
  }, [currentItems]);

  const handleImageLoad = () => {
    setImagesLoaded(prevCount => prevCount + 1);
  };
  const getFullYear = fulldate => {
    const date = new Date(fulldate);
    const year = date.getFullYear();
    return year;
  };
  const getShortMovieTitle = movietitle => {
    const maxLength = 18;

    const limitedTitle =
      movietitle?.length > maxLength
        ? movietitle.substring(0, maxLength) + '...'
        : movietitle;

    return limitedTitle;
  };
  const handleCardClick = movie => {
    dispatch(setClickedMovie(movie));
  };

  return (
    <>
      <Box position="relative">
        {/* Skeleton behind the real cards; visible while images are loading */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          zIndex={1}
          style={{
            transition: 'opacity 300ms ease',
            opacity:
              currentItems &&
              currentItems.length > 0 &&
              imagesLoaded === currentItems.length
                ? 0
                : 1,
            pointerEvents: 'none',
          }}
        >
          <MovieCardSkeleton
            flexWidth={flexWidth}
            count={currentItems.length || 6}
          />
        </Box>

        {/* Actual cards; fade in when all images are loaded */}
        <Flex
          alignItems="center"
          gap="3"
          wrap="wrap"
          justifyContent="space-between"
          style={{
            transition: 'opacity 300ms ease, transform 300ms ease',
            opacity:
              currentItems &&
              currentItems.length > 0 &&
              imagesLoaded === currentItems.length
                ? 1
                : 0,
            transform:
              currentItems &&
              currentItems.length > 0 &&
              imagesLoaded === currentItems.length
                ? 'none'
                : 'translateY(6px)',
            zIndex: 2,
          }}
        >
          {currentItems &&
            currentItems.map((movie, index) => (
              <Box
                boxShadow="xl"
                w={isMobile ? '48%' : `${flexWidth}`}
                minW="100px"
                bg="gray.300"
                mb={4}
                key={index}
              >
                <ChakraLink
                  as={ReactRouterLink}
                  to="/details"
                  onClick={() => handleCardClick(movie)}
                >
                  <Card
                    maxW="md"
                    className="movie-card"
                    data-id={movie.id}
                    data-media-type={movie.media_type}
                  >
                    <Image
                      objectFit="cover"
                      src={
                        movie.poster_path
                          ? `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
                          : require('../assets/img/blank.jpg')
                      }
                      alt="Chakra UI"
                      onLoad={handleImageLoad}
                      className={movie.poster_path ? '' : 'blank-img'}
                    />
                    <CardBody className="movie-card-body" pt={3} pb={3}>
                      <Text fontSize="xs" className="movie-date" mb={2}>
                        {getFullYear(
                          movie.release_date
                            ? movie.release_date
                            : movie.first_air_date
                        )}
                      </Text>
                      <Heading as="h6" size="sm" mb={2} className="movie-title">
                        {getShortMovieTitle(
                          movie.title ? movie.title : movie.name
                        )}
                      </Heading>
                      <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress
                          value={movie.vote_average * 10}
                          color="#FFC001"
                          size="40px"
                          className="canvas-progress"
                          position={'absolute'}
                        >
                          <CircularProgressLabel>
                            {(movie.vote_average * 10).toFixed()}%
                          </CircularProgressLabel>
                        </CircularProgress>
                      </Box>
                    </CardBody>
                  </Card>
                </ChakraLink>
              </Box>
            ))}
        </Flex>
      </Box>
    </>
  );
}

function MovieCard({ items, flexWidth }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLoadMoreClick = async () => {
    // Preserve scroll position, request next page, then restore position
    const scrollY = window.scrollY || window.pageYOffset || 0;
    await dispatch(fetchByLoadMore('discover/movie'));
    await dispatch(fetchMovies());
    // restore scroll so user stays at same position
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  };

  return (
    <>
      <Movies currentItems={items} flexWidth={flexWidth} />

      {location.pathname === '/explore-movies' ? (
        <Button
          onClick={handleLoadMoreClick}
          mt={2}
          size="md"
          width="20%"
          className="load-more-btn"
        >
          Load More
        </Button>
      ) : (
        ''
      )}
    </>
  );
}

export default MovieCard;

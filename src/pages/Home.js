import { Container, Flex, Box, Fade } from '../lib/chakra';
import MovieCard from '../components/MovieCard';
import { useSelector } from 'react-redux';
import { STATUSES, DEFAULTS } from '../constants';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import HeaderFilter from '../components/HeaderFilter';

function Home() {
  const { data: movies, status } = useSelector(state => state.movies);

  return (
    <>
      <Container maxW="8xl" color="white" padding={4} mt={50} mb={50}>
        <HeaderFilter />
        <Flex>
          <Box flex="4">
            <Fade in={true} transition={{ enter: { duration: 0.3 } }}>
              {status === STATUSES.LOADING ? (
                <MovieCardSkeleton flexWidth="19%" />
              ) : status === STATUSES.ERROR ? (
                <Box textAlign="center" py={10}>
                  <MovieCardSkeleton flexWidth="19%" />
                </Box>
              ) : (
                <Fade in={true} transition={{ enter: { duration: 0.5 } }}>
                  <MovieCard
                    itemsPerPage={DEFAULTS.ITEMS_PER_PAGE}
                    items={movies}
                    flexWidth="19%"
                  />
                </Fade>
              )}
            </Fade>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default Home;

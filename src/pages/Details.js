import {
  Box,
  Container,
  Heading,
  Flex,
  Image,
  Text,
  Avatar,
  Divider,
  SimpleGrid,
  Center,
  Wrap,
  WrapItem,
} from '../lib/chakra';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/';

function Details() {
  const clickedMovie = useSelector(state => state.movies.clickedMovie); // Get clickedId from the Redux store
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        const genreMap = response.data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchExtra = async () => {
      if (!clickedMovie?.id) return;
      try {
        // Credits (cast)
        const creditsRes = await axios.get(
          `${BASE_URL}movie/${clickedMovie.id}/credits?api_key=${apiKey}&language=en-US`
        );
        setCast(creditsRes.data.cast.slice(0, 8));
        // Similar movies
        const similarRes = await axios.get(
          `${BASE_URL}movie/${clickedMovie.id}/similar?api_key=${apiKey}&language=en-US&page=1`
        );
        setSimilar(similarRes.data.results.slice(0, 8));
      } catch (error) {
        // fail silently
      }
    };
    fetchExtra();
  }, [clickedMovie]);

  return (
    <>
      <div className="c-wrap">
        <Container maxW="4xl" bg="white" padding={4} mt={50} mb={50}>
          <Flex alignItems="flex-start" gap="8" className="inner-wrap">
            <Image
              objectFit="cover"
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${clickedMovie.poster_path}`}
              alt="Chakra UI"
            />
            <Box>
              <Heading as="h3" size="lg" pb={4} color="black">
                {clickedMovie.title || clickedMovie.name}{' '}
              </Heading>
              <Text fontSize="sm" color="black" pb={5}>
                {clickedMovie.overview}
              </Text>
              <Text fontSize="sm" pb={1}>
                <strong>Release Date :</strong>{' '}
                {clickedMovie.release_date || clickedMovie.first_air_date}
              </Text>
              <Text fontSize="sm" pb={1}>
                <strong>Genres :</strong>{' '}
                {clickedMovie.genre_ids.map(id => genres[id]).join(', ')}
              </Text>
              <Text fontSize="sm">
                <strong>User Score :</strong>{' '}
                {(clickedMovie.vote_average * 10).toFixed()}%
              </Text>
            </Box>
          </Flex>

          {/* Cast Section */}
          {cast.length > 0 && (
            <Box mt={8}>
              <Divider mb={3} />
              <Heading
                as="h3"
                size="md"
                mb={4}
                color="black"
                textAlign="center"
              >
                Cast
              </Heading>
              <Center>
                <Wrap justify="center" spacing="32px">
                  {cast.map(actor => (
                    <WrapItem
                      key={actor.cast_id || actor.id}
                      flexDirection="column"
                      alignItems="center"
                      minW="110px"
                    >
                      <Avatar
                        src={
                          actor.profile_path
                            ? `https://www.themoviedb.org/t/p/w185${actor.profile_path}`
                            : undefined
                        }
                        name={actor.name}
                        size="xl"
                        mb={2}
                      />
                      <Text fontSize="sm" fontWeight="bold" textAlign="center">
                        {actor.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        {actor.character}
                      </Text>
                    </WrapItem>
                  ))}
                </Wrap>
              </Center>
            </Box>
          )}

          {/* Similar Movies Section */}
          {similar.length > 0 && (
            <Box mt={8}>
              <Divider mb={3} />
              <Heading
                as="h3"
                size="md"
                mb={4}
                color="black"
                textAlign="center"
              >
                Similar Movies
              </Heading>
              <SimpleGrid
                columns={[2, 3, 4]}
                spacingX={8}
                spacingY={6}
                justifyItems="center"
              >
                {similar.map(movie => (
                  <Box key={movie.id} textAlign="center">
                    <Image
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                      alt={movie.title}
                      boxSize="140px"
                      objectFit="cover"
                      mx="auto"
                      mb={2}
                    />
                    <Text fontSize="sm" noOfLines={2}>
                      {movie.title}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Container>
        <Box height="50px" />
      </div>
    </>
  );
}

export default Details;

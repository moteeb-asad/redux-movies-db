import React, { useState, useEffect } from 'react';
import {
  Select,
  Heading,
  Checkbox,
  CheckboxGroup,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  fetchBySidebarSorting,
  fetchMovies,
  setSortByInitialized,
} from '../store/moviesSlice';
import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/';

function SidebarFilters() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        // fail silently
      }
    };
    fetchGenres();
  }, []);

  // Generate last 20 years for year dropdown
  const years = Array.from(
    { length: 20 },
    (_, i) => `${new Date().getFullYear() - i}`
  );
  // Common languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'it', name: 'Italian' },
    { code: 'ru', name: 'Russian' },
  ];

  // --- Filtering Logic ---
  useEffect(() => {
    // Build query params for TMDB discover API
    let params = [];
    if (selectedGenres.length > 0)
      params.push(`with_genres=${selectedGenres.join(',')}`);
    if (selectedYear) params.push(`primary_release_year=${selectedYear}`);
    if (selectedLanguage)
      params.push(`with_original_language=${selectedLanguage}`);
    if (minScore > 0) params.push(`vote_average.gte=${minScore / 10}`); // TMDB expects 0-10
    if (sortBy) params.push(`sort_by=${sortBy}`);
    const query =
      params.length > 0
        ? `discover/movie?${params.join('&')}`
        : 'discover/movie';
    dispatch(fetchMovies(query));
  }, [
    selectedGenres,
    selectedYear,
    selectedLanguage,
    minScore,
    sortBy,
    dispatch,
  ]);

  const handleSortChange = e => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);
    dispatch(fetchBySidebarSorting(selectedOption));
    dispatch(setSortByInitialized(true));
  };
  const handleGenreChange = values => setSelectedGenres(values);
  const handleYearChange = e => setSelectedYear(e.target.value);
  const handleLanguageChange = e => setSelectedLanguage(e.target.value);
  const handleScoreChange = val => setMinScore(val);

  return (
    <>
      <Heading as="h4" size="sm" mb={2} className="movie-title" color="#000">
        Sort By :
      </Heading>
      <Select
        placeholder="Select option"
        color="black"
        bg="white"
        borderColor="gray.300"
        variant="outline"
        className="sorting-filter"
        mb={4}
        onChange={handleSortChange}
        value={sortBy}
      >
        <option value="title.asc">Title (A-Z)</option>
        <option value="title.desc">Title (Z-A)</option>
        <option value="vote_average.asc">Rating Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
      </Select>

      <Divider my={3} />
      <Heading as="h4" size="sm" mb={2} className="movie-title" color="#000">
        Genres :
      </Heading>
      <Box
        bg="white"
        borderRadius="md"
        borderWidth={1}
        borderColor="gray.300"
        p={2}
        mb={3}
      >
        <CheckboxGroup
          colorScheme="yellow"
          value={selectedGenres}
          onChange={handleGenreChange}
        >
          <Stack spacing={1} direction="column" maxH="120px" overflowY="auto">
            {genres.map(genre => (
              <Checkbox
                key={genre.id}
                value={String(genre.id)}
                colorScheme="yellow"
                color="black"
              >
                {genre.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>

      <Divider my={3} />
      <Heading as="h4" size="sm" mb={2} className="movie-title" color="#000">
        Year :
      </Heading>
      <Select
        placeholder="Any Year"
        value={selectedYear}
        onChange={handleYearChange}
        mb={3}
        color="black"
        bg="white"
        borderColor="gray.300"
        variant="outline"
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>

      <Divider my={3} />
      <Heading as="h4" size="sm" mb={2} className="movie-title" color="#000">
        Language :
      </Heading>
      <Select
        placeholder="Any Language"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        mb={3}
        color="black"
        bg="white"
        borderColor="gray.300"
        variant="outline"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </Select>

      <Divider my={3} />
      <Heading as="h4" size="sm" mb={2} className="movie-title" color="#000">
        Min User Score :
      </Heading>
      <Box px={2} mb={3}>
        <Slider
          aria-label="slider-ex-1"
          colorScheme="yellow"
          defaultValue={0}
          min={0}
          max={10}
          step={0.1}
          value={minScore}
          onChange={handleScoreChange}
        >
          <SliderTrack bg="gray.200">
            <SliderFilledTrack bg="yellow.400" />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text fontSize="sm" mt={1} color="black">
          Min Score: {minScore.toFixed(1)}
        </Text>
      </Box>
    </>
  );
}

export default SidebarFilters;

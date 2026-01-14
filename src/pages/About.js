import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  ListItem,
  UnorderedList,
} from '../lib/chakra';

function About() {
  return (
    <>
      <div className="c-wrap">
        <Container maxW="4xl" bg="white" padding={4} mt={50} mb={50}>
          <Flex alignItems="flex-start" gap="8">
            <Box>
              <Heading as="h5" size="md" pb={4} color="black">
                About this project
              </Heading>
              <Text fontSize="sm" mb={2}>
                This project is a small movie discovery web app built with
                React. It uses The Movie Database (TMDB) API to display
                trending, popular, upcoming, and now-playing movies and TV
                shows. The UI is built with Chakra UI and application state is
                managed with Redux Toolkit and persisted using redux-persist.
              </Text>
              <Text fontSize="sm" mb={2}>
                Purpose: to demonstrate building a responsive React app with
                search, filtering, pagination, and client-side state management.
                It's intended as a learning / demo project and a simple movie
                browsing experience.
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="flex-start" gap="8" mt={5}>
            <Box>
              <Heading as="h5" size="md" pb={4} color="black">
                Features
              </Heading>
              <UnorderedList>
                <ListItem>Search movies and TV shows by title.</ListItem>
                <ListItem>
                  Filter by genre, year, language, and minimum score.
                </ListItem>
                <ListItem>
                  Sort results and load additional pages (pagination).
                </ListItem>
                <ListItem>
                  Responsive layout with skeleton loading states.
                </ListItem>
                <ListItem>State persistence using redux-persist.</ListItem>
              </UnorderedList>
            </Box>
          </Flex>
          <Flex alignItems="flex-start" gap="8" mt={5}>
            <Box>
              <Heading as="h5" size="md" pb={4} color="black">
                Run & Development
              </Heading>
              <UnorderedList>
                <ListItem>Node.js 16+ recommended.</ListItem>
                <ListItem>Install dependencies with `npm install`.</ListItem>
                <ListItem>
                  Run locally with `npm start` and build with `npm run build`.
                </ListItem>
              </UnorderedList>
            </Box>
          </Flex>
          <Flex alignItems="flex-start" gap="8" mt={5}>
            <Box>
              <Heading as="h5" size="md" pb={4} color="black">
                Future improvements
              </Heading>
              <UnorderedList>
                <ListItem>
                  Improve accessibility (a11y) and keyboard navigation.
                </ListItem>
                <ListItem>Add unit and integration tests.</ListItem>
                <ListItem>
                  Cache API responses and add optimistic UI updates.
                </ListItem>
                <ListItem>
                  Refactor to use typed interfaces (TypeScript).
                </ListItem>
              </UnorderedList>
            </Box>
          </Flex>
        </Container>
      </div>
    </>
  );
}

export default About;

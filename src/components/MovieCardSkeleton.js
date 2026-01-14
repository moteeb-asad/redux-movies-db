import React from 'react';
import {
  Skeleton,
  Card,
  CardBody,
  useMediaQuery,
  Box,
  Flex,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { DEFAULTS, BREAKPOINTS, ANIMATION_DURATIONS } from '../constants';

// Define smooth animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

function MovieCardSkeleton({ flexWidth }) {
  const [isMobile] = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);

  // Custom skeleton style with shimmer effect
  const shimmerStyle = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200px 100%',
    animation: `${shimmer} 1.5s infinite`,
  };

  return (
    <Flex
      alignItems="center"
      gap="3"
      wrap="wrap"
      justifyContent="space-between"
      opacity={0.8}
      transition={`opacity ${ANIMATION_DURATIONS.NORMAL}s ease-in-out`}
    >
      {Array.from(Array(DEFAULTS.SKELETON_COUNT)).map((_, index) => (
        <Box
          boxShadow="xl"
          w={isMobile ? '48%' : `${flexWidth}`}
          minW="100px"
          bg="gray.300"
          mb={4}
          key={index}
          borderRadius="lg"
          overflow="hidden"
          transition={`transform ${ANIMATION_DURATIONS.FAST}s ease-in-out`}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: '2xl',
          }}
        >
          <Card maxW="md" className="movie-card-skeleton" bg="transparent">
            <Skeleton
              height="280px"
              startColor="gray.200"
              endColor="gray.400"
              style={shimmerStyle}
              borderRadius="md"
            />
            <CardBody pt={3} pb={3} className="movie-card-skeleton-body">
              <Skeleton
                height="10px"
                width="50%"
                mb={2}
                startColor="gray.200"
                endColor="gray.400"
                style={shimmerStyle}
                borderRadius="full"
              />
              <Skeleton
                height="10px"
                width="70%"
                mb={2}
                startColor="gray.200"
                endColor="gray.400"
                style={shimmerStyle}
                borderRadius="full"
              />
              <Skeleton
                height="10px"
                width="30%"
                startColor="gray.200"
                endColor="gray.400"
                style={shimmerStyle}
                borderRadius="full"
              />
            </CardBody>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}

export default MovieCardSkeleton;

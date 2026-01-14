import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  return (
    <Box
      bg={useColorModeValue('#121620', 'gray.900')}
      color={useColorModeValue('#fff', 'gray.200')}
      className={
        location.pathname === '/details' ||
        location.pathname === '/project-details'
          ? 'fixed-footer'
          : ''
      }
    >
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          spacing={4}
          justify={'center'}
          align={'center'}
        >
          <Text>© 2026. All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  );
}

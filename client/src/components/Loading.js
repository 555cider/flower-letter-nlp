import React from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

function Loading() {
  return (
    <div>
      <Box h="100vh" w="100%" position="relative">
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Text fontSize="3xl">꼭 맞는 시집을 만들어 내는중</Text>

          <Spinner size="xl" />
        </Flex>
      </Box>
    </div>
  );
}
export default Loading;

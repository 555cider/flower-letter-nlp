import React, { useEffect } from 'react';
import { Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

function Loading() {
  const navigate = useNavigate();
  setTimeout(function () {
    navigate('/create/keyword');
  }, 3000);
  return (
    <div>
      <Box
        h="100vh"
        w="100%"
        position="relative"
        bgGradient={'radial(white, #FBEDE0, #D4BBDD)'}
      >
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <VStack justify={'center'}>
            <Spinner
              w={20}
              h={20}
              thickness="6px"
              speed="0.65s"
              emptyColor="#FBEDE0"
              color="#D4BBDD"
            />
            <Text fontSize="3xl" fontFamily={'HandWrite'}>
              꼭 맞는 시집을 만들어 내는 중
            </Text>
          </VStack>
        </Flex>
      </Box>
    </div>
  );
}
export default Loading;

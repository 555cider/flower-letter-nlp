import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import styled from 'styled-components';
import {
  Container,
  Button,
  Text,
  VStack,
  Stack,
  useBreakpointValue,
  Box,
  Image,
  Center,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <SidebarComponent></SidebarComponent>

      <VStack
        w="full"
        h="full"
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Stack
          align={'flex-start'}
          spacing={6}
          alignItems={'center'}
          whiteSpace={'pre-line'}
        >
          <Text
            color="black"
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
          >
            지금부터 시집을 생성해보세요
          </Text>
          <Box>
            <Image
              src="img/lavenderBook.png"
              boxSize="400px"
              borderRadius="20px"
            ></Image>
          </Box>
          <Button
            onClick={() => {
              navigate('/create');
            }}
          >
            편지쓰러가기
          </Button>
        </Stack>
      </VStack>
      <VStack
        w="full"
        h="full"
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Stack
          align={'flex-start'}
          spacing={6}
          alignItems={'center'}
          whiteSpace={'pre-line'}
        >
          <Box w="700px" h="400px" bg="#E8B4B8" borderRadius="30px">
            <Text
              fontSize="3xl"
              color="white"
              justifyContent="center"
              textAlign="center"
            >
              Price
            </Text>

            <Center>*자유글 별도, 추가시 페이지당 300원</Center>
          </Box>
        </Stack>
      </VStack>
    </div>
  );
};

export default Start;

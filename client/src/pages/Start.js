import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import styled from 'styled-components';
import {
  Container,
  Button,
  Text,
  VStack,
  Flex,
  useBreakpointValue,
  Box,
  Image,
  Center,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <SidebarComponent></SidebarComponent>
      {/* 첫번째 스크롤 */}
      <VStack
        w="full"
        h="full"
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundColor={'#FBEDE0'}
      >
        <Box w="100px" h="100px">
          <Image src="/img/logopng.png"></Image>
        </Box>
        <Box w="90%" textAlign={'center'}>
          <Text
            mt="3"
            color="black"
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
            fontFamily={'EliceRegular'}
          >
            여기는
            <br />
            문구가 들어갑니다.
          </Text>
        </Box>
        <Box textAlign={'center'}>
          <Text
            mt="8"
            color="black"
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
            fontFamily={'EnglishHandy'}
          >
            Flower Letter
          </Text>
        </Box>
      </VStack>
      {/* 두번째 스크롤 */}
      <VStack
        w="full"
        h="full"
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        backgroundPosition="center"
        backgroundSize="cover"
        bgGradient={'linear(to-t, #D4BBDD, #FBEDE0)'}
      >
        <HStack w="80%" h="80%">
          <Flex h="80%" w="58%" align="center" justify="center">
            <Box h="85%" w="58%" border="1px">
              <Image src={''}></Image>이미지 추가 필요
            </Box>
          </Flex>
          <Box h="80%" w="42%">
            <VStack w="100%" h="100%" p="2">
              <Box w="100%" h="80%" p="5">
                <Text
                  p="5"
                  color="black"
                  lineHeight={1.5}
                  fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
                  fontFamily={'EnglishHandy'}
                >
                  지금부터 시집을 생성해 보세요. 멋지고 아름답고 환상적인 나만의
                  시집이 여기 있습니다.
                </Text>
              </Box>
              <Button
                onClick={() => {
                  navigate('/create');
                }}
                color="#A49393"
                backgroundColor={'#FBEDE0'}
                w="200px"
                h="50px"
                borderRadius={'15px'}
              >
                편지쓰러가기
              </Button>
            </VStack>
          </Box>
        </HStack>
      </VStack>
      {/* 세번째 스크롤 */}
      <VStack
        w="full"
        h="full"
        px={useBreakpointValue({ base: 4, md: 8 })}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundColor={'#D4BBDD'}
      >
        <Flex
          border="1px"
          w="150%"
          h="200px"
          backgroundColor={'#613659'}
          justify={'center'}
          align={'center'}
        >
          <Box textAlign={'center'}>
            <Text
              color="white"
              fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
              fontFamily={'EliceBold'}
              mb="5"
            >
              어떻게 하는지 모르겠나요? 순서 알랴드림!
            </Text>
            <Button
              onClick={() => {
                navigate('/howtouse');
              }}
              color="#D4BBDD"
              backgroundColor={'white'}
              w="200px"
              h="50px"
              borderRadius={'15px'}
              fontSize={'lg'}
            >
              사용방법
            </Button>
          </Box>
        </Flex>
        <VStack h="100%" w="60%">
          <Box h="35%" w="100%"></Box>
          <Flex
            w="100%"
            h="65%"
            bg="white"
            borderTopRadius={'30px'}
            justify={'center'}
            align={'center'}
          >
            <Text
              p="5"
              fontSize="2xl"
              color="black"
              justifyContent="center"
              textAlign="center"
            >
              Price
              <br />
              48,000원
              <br />
              *자유글 별도, 추가시 페이지당 300원
            </Text>
          </Flex>
        </VStack>
      </VStack>
    </div>
  );
};

export default Start;

import React, { useEffect } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import StepsLetter from './StepsLetter';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import PoemContainer from './create/PoemContainer';
import { Text } from '@chakra-ui/react';
import CreatePageEx from './CreatePageEx';

import { Button, HStack, VStack, Flex, Box, Spacer } from '@chakra-ui/react';
import Preview from './Preview';

function EditAnthology() {
  const navigate = useNavigate();
  const { poems, font, color } = useSelector((state) => ({
    poems: state.poems,
    font: state.userfont,
    color: state.usercolor,
  }));

  const keywordList = poems[0].keywords.map((keyword, index) => (
    <p key={index} fontSize="100px">
      <Text fontSize="3xl">"{keyword}"</Text>
    </p>
  ));

  return (
    <div>
      <VStack h="100vh" bgGradient={'radial(white, #FDF5E6, #FBEBCD, #FBEED4)'}>
        <StepsLetter></StepsLetter>
        <CreatePageEx exText={'tjfaud ansrnasdfaweoifj'}></CreatePageEx>

        <HStack
          h="80vh"
          w="99%"
          p="2"
          ml="5"
          mr="5"
          align="center"
          justify="center"
        >
          {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
          <Flex
            w="47%"
            h="100%"
            borderRadius="10px"
            mr="1"
            p="2"
            align="center"
            justify="center"
          >
            {/* 왼쪽 박스*/}
            <Preview userfont={font} usercolor={color} />
          </Flex>
          <VStack
            justify="center"
            w="27%"
            h="100%"
            borderRadius="10px"
            ml="1"
            p="4"
          >
            {/* 오른쪽 박스 - 키워드 비율 조절 */}
            <VStack textAlign={'center'}>
              <Text fontFamily={'EliceRegular'}>시집의 추천 키워드는</Text>
              <Text fontFamily={'EliceRegular'}>{keywordList}</Text>
              <Text fontFamily={'EliceRegular'}>입니다.</Text>
            </VStack>
            {/*}
          <HStack
            display="flex"
            m="1"
            p="2"
            mb="0"
            w="100%"
            h="65%"
            align="center"
            border="1px"
          >
        
            <Box w="100%" border="1px" h="100%" align="center" justify="center">
              <input className="keywordrange" type="range"></input>
            </Box>
            <Box w="100%" border="1px" h="100%">
              <input className="keywordrange" type="range"></input>
            </Box>
            <Box w="100%" border="1px" h="100%">
              <input className="keywordrange" type="range"></input>
            </Box>
            <Box w="100%" border="1px" h="100%">
              <input className="keywordrange" type="range"></input>
            </Box>
 
          </HStack>
          <HStack
            m="1"
            mt="0"
            p="2"
            w="100%"
            h="12%"
            align="center"
            border="1px"
            fontSize="1.5vw"
          >
            <Box w="25%" border="1px" h="100%" align="center">
              #사랑
            </Box>
            <Box w="25%" border="1px" h="100%" align="center">
              #우정
            </Box>
            <Box w="25%" border="1px" h="100%" align="center">
              #인생
            </Box>
            <Box w="25%" border="1px" h="100%" align="center">
              #가족
            </Box>
          </HStack>
           */}
          </VStack>
        </HStack>

        <Flex pl="6" pr="6" h="10%" w="100%">
          <Box>
            <Button
              borderRadius={'15px'}
              w="25vh"
              h="7vh"
              fontFamily={'EliceBold'}
              _hover={{ bg: '#A49393', color: 'white' }}
              bg="white"
              borderColor="#A49393"
              color="#A49393"
              fontSize="3vh"
              onClick={() => {
                navigate('/create');
              }}
            >
              이전 단계
            </Button>
          </Box>
          <Spacer />
          <Box>
            <Button
              borderRadius={'15px'}
              w="25vh"
              h="7vh"
              fontFamily={'EliceBold'}
              _hover={{ bg: '#A49393', color: 'white' }}
              bg="white"
              borderColor="#A49393"
              color="#A49393"
              fontSize="3vh"
              onClick={() => {
                navigate('/create/flowerlang');
              }}
            >
              다음 단계
            </Button>
          </Box>
        </Flex>
      </VStack>
    </div>
  );
}

export default EditAnthology;

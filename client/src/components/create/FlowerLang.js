import React, { useRef, useState } from 'react';
import StepsLetter from '../StepsLetter';
import Preview from '../Preview';

import {
  Flex,
  HStack,
  Box,
  Button,
  Spacer,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CreatePageEx from '../CreatePageEx';

export default function FlowerLang() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { flowersList, font, color } = useSelector((state) => ({
    flowersList: state.flowersList,
    font: state.userfont,
    color: state.usercolor,
  }));

  const saveFlower = (user_flower_id, user_flower_symbol) => {
    dispatch({ type: 'SAVE_USER_FLOWER', user_flower_id, user_flower_symbol });
  };

  const [buttonColor, setButtonColor] = useState('skyblue');

  const flowerList = flowersList.map((content, index) => (
    <Button
      variant="solid"
      key={index}
      m="2"
      w="90%"
      h="60px"
      bg={buttonColor}
      fontWeight="600"
      color="white"
      onClick={() => {
        saveFlower(content['_id'], content['symbol']);
      }}
    >
      {content['flower']}-{content['symbol']}
    </Button>
  ));

  return (
    <div>
      <VStack h="100vh" bgGradient={'radial(white, #FDF5E6, #FCF0D9, #EBD2C0)'}>
        <StepsLetter />
        <CreatePageEx exText={'tjfaud ansrnasdfaweoifj'}></CreatePageEx>

        <HStack
          h="80vh"
          w="100%"
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
            {/* 왼쪽 박스 */}

            <Preview userfont={font} usercolor={color} />
          </Flex>
          <Flex
            justify="center"
            w="27%"
            h="100%"
            borderRadius="10px"
            ml="1"
            p="4"
            align={'center'}
          >
            {/* 오른쪽 박스 */}
            <div className="scrollbox" align="center">
              <div>{flowerList}</div>
            </div>
          </Flex>
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
                navigate('/create/keyword');
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
                navigate('/create/bookcover');
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

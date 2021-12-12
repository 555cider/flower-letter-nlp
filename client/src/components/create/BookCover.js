import React, { useState } from 'react';
import StepsLetter from '../StepsLetter';
import {
  Flex,
  HStack,
  Box,
  Button,
  Spacer,
  useRadioGroup,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch, batch, useSelector } from 'react-redux';
import { FONTS, COLORS } from './DesignOptions';
import Preview from '../Preview';
import CreatePageEx from '../CreatePageEx';

export default function BookCover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //리덕스에서 불러온 초기값
  const { color, font } = useSelector((state) => ({
    color: state.usercolor,
    font: state.userfont,
  }));

  const [userFont, setUserFont] = useState(font);
  const [userColor, setUserColor] = useState(color);

  const clickNextButton = () => {
    batch(() => {
      dispatch({ type: 'SAVE_FONT', userFont });
      dispatch({ type: 'SAVE_COLOR', userColor });
    });
    navigate('/create/freecontent');
  };

  return (
    <div>
      <VStack h="100vh" bgGradient={'radial(white, #FDF5E6, #FBEBCD, #FBEED4)'}>
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
            align={'center'}
            justify="center"
          >
            {/* 왼쪽 박스 */}
            <Preview userfont={userFont} usercolor={userColor} />
          </Flex>
          <Flex
            w="27%"
            h="100%"
            borderRadius="10px"
            ml="1"
            p="4"
            justify="center"
            align="center"
          >
            {/* 오른쪽 박스 */}
            <VStack w="100%" h="65vh" align="center" p="2" m="1">
              <Text>컬러</Text>
              <div className="scrollbox" align="center">
                <Button
                  className="flowerbutton"
                  m="2"
                  w="90%"
                  h="60px"
                  bg="skyblue"
                  fontWeight="600"
                  color="#774831"
                  backgroundColor={COLORS.option1}
                  onClick={() => {
                    setUserColor(COLORS.option1);
                  }}
                >
                  Beige
                </Button>
                <Button
                  className="flowerbutton"
                  m="2"
                  w="90%"
                  h="60px"
                  bg="skyblue"
                  fontWeight="600"
                  color="#401616"
                  backgroundColor={COLORS.option2}
                  onClick={() => {
                    setUserColor(COLORS.option2);
                  }}
                >
                  White
                </Button>
                <Button
                  className="flowerbutton"
                  m="2"
                  w="90%"
                  h="60px"
                  bg="skyblue"
                  fontWeight="600"
                  color="white"
                  backgroundColor={COLORS.option3}
                  onClick={() => {
                    setUserColor(COLORS.option3);
                  }}
                >
                  Black
                </Button>
              </div>
              <Text>폰트</Text>

              <div className="scrollbox" align="center">
                <Button
                  className="flowerbutton"
                  m="2"
                  w="90%"
                  h="60px"
                  bg="skyblue"
                  fontWeight="600"
                  color="white"
                  fontFamily={FONTS.option1}
                  fontSize="30px"
                  onClick={() => {
                    setUserFont(FONTS.option1);
                  }}
                >
                  나눔 할아버지체
                </Button>
                <Button
                  className="flowerbutton"
                  m="2"
                  w="90%"
                  h="60px"
                  bg="skyblue"
                  fontWeight="600"
                  color="white"
                  fontFamily={FONTS.option2}
                  fontSize="30px"
                  onClick={() => {
                    setUserFont(FONTS.option2);
                  }}
                >
                  나눔 엄마체
                </Button>
              </div>
            </VStack>
          </Flex>
        </HStack>

        <Flex pl="6" pr="6" h="10%" w="100%">
          <Box>
            <Button
              borderRadius={'15px'}
              w="25vh"
              h="7vh"
              fontFamily={'EliceBold'}
              _hover={{ bg: '#D4BBDD', color: 'white' }}
              bg="white"
              borderColor="#D4BBDD"
              border="2px"
              color="#D4BBDD"
              fontSize="3vh"
              onClick={() => {
                navigate('/create/flowerlang');
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
              _hover={{ bg: '#D4BBDD', color: 'white' }}
              bg="white"
              borderColor="#D4BBDD"
              border="2px"
              color="#D4BBDD"
              fontSize="3vh"
              onClick={clickNextButton}
            >
              다음 단계
            </Button>
          </Box>
        </Flex>
      </VStack>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';

const RightBox = styled.div`
  width: 330px;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdfdfd;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(120, 120, 120, 0.2);
  font-family: 'Sungsil';
  font-size: 1.5rem;
  .flowerbutton {
    box-shadow: 1px 1px 1px rgba(120, 120, 120, 0.2);
    &:hover {
      border: 3px solid black;
      font-weight: bold;
    }
  }

  .selected {
    border: 3px solid #555;
    font-weight: bold;
  }
`;

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

  const [passed, setPassed] = useState(false);
  const passCheck = () => {
    if (userColor !== '' && userFont !== '') {
      setPassed(true);
    }
  };
  useEffect(() => {
    passCheck();
  }, [userColor, userFont]);

  return (
    <div>
      <VStack h="100vh" bgGradient={'radial(white, #FDF5E6, #FBEBCD, #FBEED4)'}>
        <StepsLetter />
        <CreatePageEx
          exText={'폰트와 컬러 선택을 통해 시집을 멋지게 꾸며보세요!'}
        ></CreatePageEx>

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
            <RightBox>
              <Text>컬러</Text>
              <Button
                className={
                  userColor === COLORS.option1
                    ? 'flowerbutton selected '
                    : 'flowerbutton'
                }
                m="2"
                w="90%"
                h="50px"
                fontWeight="100"
                color="#774831"
                _hover={{}}
                backgroundColor={COLORS.option1}
                onClick={() => {
                  setUserColor(COLORS.option1);
                }}
              >
                Beige
              </Button>
              <Button
                className={
                  userColor === COLORS.option2
                    ? 'flowerbutton selected '
                    : 'flowerbutton'
                }
                m="2"
                w="90%"
                h="50px"
                fontWeight="100"
                color="#401616"
                _hover={{}}
                backgroundColor={COLORS.option2}
                onClick={() => {
                  setUserColor(COLORS.option2);
                }}
              >
                White
              </Button>
              <Button
                className={
                  userColor === COLORS.option3
                    ? 'flowerbutton selected '
                    : 'flowerbutton'
                }
                m="2"
                w="90%"
                h="50px"
                fontWeight="100"
                fontSize="1.2rem"
                color="white"
                _hover={{}}
                backgroundColor={COLORS.option3}
                onClick={() => {
                  setUserColor(COLORS.option3);
                }}
              >
                Black
              </Button>

              <Text>폰트</Text>
              <Button
                className={
                  userFont === FONTS.option1
                    ? 'flowerbutton selected '
                    : 'flowerbutton'
                }
                m="2"
                w="90%"
                h="50px"
                bg="#d8bfd7"
                fontWeight="100"
                color="black"
                fontFamily={FONTS.option1}
                fontSize="1.4rem"
                _hover={{}}
                onClick={() => {
                  setUserFont(FONTS.option1);
                  dispatch({ type: 'SAVE_FONT', userFont });
                }}
              >
                나눔 할아버지체
              </Button>
              <Button
                className={
                  userFont === FONTS.option2
                    ? 'flowerbutton selected '
                    : 'flowerbutton'
                }
                m="2"
                w="90%"
                h="50px"
                bg="#d8bfd7"
                fontWeight="100"
                color="black"
                fontFamily={FONTS.option2}
                fontSize="1.4rem"
                _hover={{}}
                onClick={() => {
                  setUserFont(FONTS.option2);
                  dispatch({ type: 'SAVE_FONT', userFont });
                }}
              >
                나눔 엄마체
              </Button>
              <Button
                className={
                  userFont === FONTS.option3
                    ? 'flowerbutton selected '
                    : 'flowerbutton'
                }
                m="2"
                w="90%"
                h="50px"
                bg="#d8bfd7"
                fontWeight="100"
                color="black"
                fontFamily={FONTS.option3}
                fontSize="1.4rem"
                _hover={{}}
                onClick={() => {
                  setUserFont(FONTS.option3);
                  dispatch({ type: 'SAVE_FONT', userFont });
                }}
              >
                성실체
              </Button>
            </RightBox>
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
              disabled={passed ? false : true}
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

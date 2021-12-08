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

export default function BookCover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userFont, setUserFont] = useState('');
  const [userColor, setUserColor] = useState('');

  const { user_flower } = useSelector((state) => ({
    user_flower: state.user_flower,
  }));

  const clickNextButton = () => {
    navigate('/create/freecontent');
    batch(() => {
      dispatch({ type: 'SAVE_FONT', userFont });
      dispatch({ type: 'SAVE_COLOR', userColor });
    });
  };

  console.log('꽃말 리덕스 확인', user_flower);

  return (
    <div>
      <StepsLetter />
      <HStack h="70vh" p="2" ml="5" mr="5" align="center" justify="center">
        {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
        <Flex w="60%" h="100%" border="1px" borderRadius="10px" mr="1">
          {/* 왼쪽 박스 */}
          디자인 단계
        </Flex>
        <Flex
          w="40%"
          h="100%"
          border="1px"
          borderRadius="10px"
          ml="1"
          justify="center"
          align="center"
        >
          {/* 오른쪽 박스 */}
          <VStack w="100%" h="90%" align="center" border="1px" p="3" m="2">
            <Text>컬러</Text>
            <div className="scrollbox" align="center">
              <Button
                className="flowerbutton"
                m="2"
                w="90%"
                h="60px"
                bg="skyblue"
                fontWeight="600"
                color="white"
                backgroundColor="red"
                onClick={() => {
                  setUserColor('red');
                }}
              >
                Red
              </Button>
              <Button
                className="flowerbutton"
                m="2"
                w="90%"
                h="60px"
                bg="skyblue"
                fontWeight="600"
                color="white"
                backgroundColor="blue"
                onClick={() => {
                  setUserColor('blue');
                }}
              >
                \ Blue
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
                fontFamily="NanumGrandfather"
                fontSize="30px"
                onClick={() => {
                  setUserFont('NanumGrandfather');
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
                fontFamily="NanumMom"
                fontSize="30px"
                onClick={() => {
                  setUserFont('NanumMom');
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
            w="30vh"
            h="7vh"
            bg="skyblue"
            color="white"
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
            w="30vh"
            h="7vh"
            bg="skyblue"
            color="white"
            fontSize="3vh"
            onClick={clickNextButton}
          >
            다음 단계
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

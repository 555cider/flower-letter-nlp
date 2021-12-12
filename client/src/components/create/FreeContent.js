import React, { useState } from 'react';
import StepsLetter from '../StepsLetter';
import {
  Flex,
  HStack,
  Textarea,
  Box,
  Button,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Preview from '../Preview';
import CreatePageEx from '../CreatePageEx';

export default function FreeContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { free_content } = useSelector((state) => ({
    free_content: state.free_content,
  }));

  const { font, color } = useSelector((state) => ({
    font: state.userfont,
    color: state.usercolor,
  }));

  const [content, setContent] = useState(free_content);

  const clickNextButton = () => {
    dispatch({ type: 'SAVE_FREECONTENT', content });
    navigate('/create/final');
  };

  const handleChange = (e) => {
    setContent(e.target.value);
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
            <Preview userfont={font} usercolor={color} />
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
            <Textarea
              h="80%"
              _focus={{ borderColor: '' }}
              borderColor="black"
              placeholder="자유롭게 글을 작성해보세요"
              onChange={handleChange}
              value={content}
            />
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
                navigate('/create/bookcover');
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

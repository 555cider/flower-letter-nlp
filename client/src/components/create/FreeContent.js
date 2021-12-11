import React, { useState } from 'react';
import StepsLetter from '../StepsLetter';
import { Flex, HStack, Textarea, Box, Button, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Preview from '../Preview';

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

  //console.log('리덕스 font', font);
  //console.log('리덕스 color', color);

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
      <StepsLetter />
      <HStack h="70vh" p="2" ml="5" mr="5" align="center" justify="center">
        {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
        <Flex w="60%" h="100%" border="1px" borderRadius="10px" mr="1">
          {/* 왼쪽 박스 */}
          <Preview />
        </Flex>
        <Flex w="40%" h="100%" border="1px" borderRadius="10px" ml="1">
          {/* 오른쪽 박스 */}
          <Textarea
            h="100%"
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
            w="30vh"
            h="7vh"
            bg="skyblue"
            color="white"
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

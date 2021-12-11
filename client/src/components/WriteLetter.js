import React, { useState } from 'react';
import {
  Box,
  Center,
  Spacer,
  Flex,
  Stack,
  Input,
  Button,
  Textarea,
  HStack,
} from '@chakra-ui/react';
import StepsLetter from './StepsLetter';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector, batch } from 'react-redux';
import axios from 'axios';
import PreviewImageUrls from './PreviewImageUrls';

function WriteLetter({ history }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { letter_content, color } = useSelector((state) => ({
    letter_content: state.letter_content,
    color: state.usercolor,
  }));

  const [inputs, setInputs] = useState({
    content: letter_content,
  });

  const { title, content } = inputs;

  const clickNextButton = () => {
    dispatch({ type: 'SAVE_LETTER', content });
    sendLetter();

    navigate('/loading');
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const sendLetter = async () => {
    await axios({
      method: 'post',
      url: 'https://testapi.flowerletter.co.kr/results',
      data: {
        letter_content: content,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('통신 성공', response);
        console.log('꽃말 데이터', response.data.flowers);
        console.log('시 데이터', response.data.poems);

        const flowersList = response.data.flowers;
        const poems = response.data.poems;

        batch(() => {
          dispatch({ type: 'SAVE_FLOWER_DATA', flowersList });
          dispatch({ type: 'SAVE_POEMS', poems });
        });
      })
      .catch((response) => {
        alert('error');
      });
  };

  return (
    <div>
      <StepsLetter></StepsLetter>
      <HStack
        h="900px"
        p="2"
        ml="5"
        mr="5"
        mb="2"
        align="center"
        justify="center"
      >
        <Flex w="60%" h="100%" border="1px" borderRadius="10px" mr="1" mt="5">
          {/* 왼쪽 박스 */}
          <Box p="6" w="100%">
            <Stack spacing={3} h="100%">
              {/*
              <Input
                placeholder="편지 제목"
                h="7vh"
                size="sm"
                borderColor="black"
                onChange={handleChange}
                name="title"
                value={title}
              />
  */}
              <Textarea
                h="100%"
                borderColor="black"
                placeholder="편지작성"
                onChange={handleChange}
                name="content"
                value={content}
              />
            </Stack>
          </Box>
        </Flex>
      </HStack>

      <Center w="100%" h="20%">
        <Spacer />
        <Button
          mr="7"
          w="30vh"
          h="7vh"
          mb="2"
          fontSize="3vh"
          bg="skyblue"
          color="white"
          onClick={clickNextButton}
        >
          다음으로
        </Button>
      </Center>
    </div>
  );
}

export default WriteLetter;

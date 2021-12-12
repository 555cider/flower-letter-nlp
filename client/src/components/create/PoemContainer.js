import React from 'react';
import {
  Box,
  Popover,
  Button,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
} from '@chakra-ui/react';
export default function PoemContainer({ poem_title, poem_content }) {
  const sample_poem_title = '이별-도종환';
  const sample_poem_contents = [
    '당신이 처음 내 곁을 떠났을 떄',
    '나는 이것이 이별이라 생각지 않았습니다',
    '당신이 내 안에 있고',
    '나 또한 언제나 당신이 돌아오는 길을 향해 있었으므로',
    '나는 헤어지는 것이라 생각지 않았습니다',
    '그러나 이렇게 자꾸 함께 있지 못하는 시간이 길어지면서',
    '나는 이것이 이별이 아닌가 생각합니다',
  ];

  const poemContentList = sample_poem_contents.map((content, index) => (
    <p key={index}>{content}</p>
  ));

  return (
    <Box padding="2">
      <Popover>
        <PopoverTrigger>
          <Button bg="skyblue" w="100%">
            {sample_poem_title}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="100%">
            <PopoverArrow />
            <PopoverHeader>{sample_poem_title}</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody textAlign="center">
              {poemContentList}
              <Button colorScheme="blue">수정하기</Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
}

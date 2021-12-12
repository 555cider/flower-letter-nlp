import React from 'react';
import { Box, Center, Container, Text } from '@chakra-ui/react';
export default function PoemContainer({
  poem_title,
  poem_author,
  poem_content,
}) {
  const splitPoemList = poem_content.split('<br>');

  const title = poem_title !== '' ? poem_title + '-' + poem_author : '';

  const mainContentList = splitPoemList.map((content, index) => (
    <p key={index}>{content}</p>
  ));
  return (
    <Box padding="2">
      <Center>
        <Text fontSize="2xl">{title}</Text>
      </Center>
      <Container>{mainContentList}</Container>
    </Box>
  );
}

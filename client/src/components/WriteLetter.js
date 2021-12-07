import React, { useState } from 'react';
import { CloseButton, Box, Center, Spacer, Flex, Stack, Input, Button, Textarea, VStack, HStack, Breadcrumb, BreadcrumbLink, BreadcrumbItem } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import StepsLetter from './StepsLetter';
import EditAnthology from '../components/EditAnthology';
import EditContainer from './create/EditContainer';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

function WriteLetter({ history }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { letter_title, letter_content } = useSelector((state) => ({
    letter_title: state.letter_title,
    letter_content: state.letter_content,
  }));

  const [inputs, setInputs] = useState({
    title: letter_title,
    content: letter_content,
  });

  const { title, content } = inputs;

  const clickNextButton = () => {
    dispatch({ type: 'SAVE_LETTER', title, content });
    navigate('/create/keyword');
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <StepsLetter></StepsLetter>
      <HStack h='900px' p='2' ml='5' mr='5' mb='2' align='center' justify='center'>
        <Flex w='60%' h='100%' border='1px' borderRadius='10px' mr='1' mt='5'>
          {/* 왼쪽 박스 */}
          <Box p='6' w='100%'>
            <Stack spacing={3} h='100%'>
              <Input placeholder='편지 제목' h='7vh' size='sm' borderColor='black' onChange={handleChange} name='title' value={title} />
              <Textarea h='100%' borderColor='black' placeholder='편지작성' onChange={handleChange} name='content' value={content} />
            </Stack>
          </Box>
        </Flex>
      </HStack>

      <Center w='100%' h='20%'>
        <Spacer />
        <Button mr='7' w='30vh' h='7vh' mb='2' fontSize='3vh' bg='skyblue' color='white' onClick={clickNextButton}>
          다음으로
        </Button>
      </Center>
    </div>
  );
}

export default WriteLetter;

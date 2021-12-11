import React, { useState } from 'react';
import {
  VStack,
  Stack,
  Text,
  useBreakpointValue,
  FormControl,
  Input,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';

export default function QuestionForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    title: '',
    content: '',
  });

  const { name, email, title, content } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      email: '',
      title: '',
      content: '',
    });
  };
  const formData = {
    name: name,
    email: email,
    title: title,
    content: content,
  };

  const sendButton = async () => {
    await axios
      .post('https://testapi.flowerletter.co.kr/question', formData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        console.log('통신 성공', response);
        onOpen();
      })
      .catch(function (error) {
        alert('error!!');
      });
  };

  const closeButton = () => {
    onReset();
    onClose();
  };

  return (
    <VStack
      w={'full'}
      h={'full'}
      justify={'center'}
      px={useBreakpointValue({ base: 4, md: 8 })}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Text
        fontSize="4xl"
        fontWeight="bold"
        marginTop="100px"
        textAlign="left"
        fontFamily={'IM_Hyemin-Bold'}
      >
        문의 하기
      </Text>
      <Stack
        align={'flex-start'}
        spacing={6}
        alignItems={'center'}
        whiteSpace={'pre-line'}
      >
        <FormControl id="question-form" isRequired>
          <Input
            placeholder="이름"
            marginBottom="20px"
            fontFamily={'IM_Hyemin-Bold'}
            borderColor={'black'}
            name="name"
            value={name}
            onChange={onChange}
          />
          <Input
            placeholder="이메일"
            marginBottom="50px"
            fontFamily={'IM_Hyemin-Bold'}
            borderColor={'black'}
            value={email}
            onChange={onchange}
          />
          <Input
            placeholder="제목"
            marginBottom="20px"
            fontFamily={'IM_Hyemin-Bold'}
            borderColor={'black'}
            name="title"
            value={title}
            onChange={onChange}
          />

          <Textarea
            h="340px"
            borderColor="black"
            placeholder="문의 내용을 남겨주세요"
            fontFamily={'IM_Hyemin-Bold'}
            name="content"
            value={content}
            onChnage={onChange}
          ></Textarea>
        </FormControl>

        <Button
          type="submit"
          onClick={sendButton}
          fontFamily={'IM_Hyemin-Bold'}
          w="200px"
          h="50px"
          color="#A49393"
          backgroundColor={'#FBEDE0'}
        >
          보내기
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />

          <ModalContent backgroundColor={'#FBEDE0'}>
            <ModalHeader fontFamily={'IM_Hyemin-Bold'}>
              문의가 정상적으로 등록되었습니다.
            </ModalHeader>

            <ModalFooter>
              <Button
                onClick={onClose}
                color="#D4BBDD"
                backgroundColor={'white'}
                border="2px"
                borderColor="#D4BBDD"
                _hover={{
                  color: 'white',
                  backgroundColor: '#D4BBDD',
                }}
              >
                창 닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </VStack>
  );
}

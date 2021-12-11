import React from 'react';
import {
  Flex,
  Box,
  CloseButton,
  Input,
  Center,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function OrderPay({ history }) {
  const navigate = useNavigate();

  const onClickPayButton = async () => {
    sendOrderInfo();
    navigate('/checkout');
  };

  // Dummy Data
  const dummy = {
    order: {
      price: 0,
      name: '김서정',
      address: '서울',
      email: 'seojeong1101@gmail.com',
      phone: '010-1234-5678',
    },
    book: {
      letter: '나는 서정이다',
      flower_id: '행복',
      contents: [
        {
          type: 'peom',
          poem_id: '61b1f5f64af9dd1906a6e2d9',
        },
        {
          type: 'text',
          text_content: '자유글이다',
        },
      ],
    },
  };

  /*
  {
        order: {
          price: 0,
          name: 'string',
          address: 'string',
          email: 'string',
          phone: 'string',
        },
        book: {
          letter: 'string',
          flower_id: 'string',
          contents: [
            {
              type: 'string',
              poem_id: 'string',
            },
            {
              type: 'string',
              text_content: 'string',
            },
          ],
        },
      }
      */
  const sendOrderInfo = async () => {
    await axios
      .post('https://testapi.flowerletter.co.kr/orders', dummy, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        console.log('통신 성공', response);
      })
      .catch(function (error) {
        alert('error!!');
      });
  };

  return (
    <VStack w="100%" align="center" justify="center">
      <Flex h="10"></Flex>
      <HStack w="95%" h="100%" align="center" justify="center">
        <Box w="500px" h="800px" p="3">
          <Heading size="lg" pl="4">
            결제하기
          </Heading>
          <Box m="10px" p="2">
            <Heading size="md">1. 주문자 정보</Heading>
            <Center p="10px">
              <Divider orientation="horizontal" />
            </Center>
            <Input
              h="30px"
              w="200px"
              display="block"
              mb="3"
              borderColor="black"
              placeholder="이름"
            />
            <Input
              h="30px"
              w="200px"
              display="block"
              mb="3"
              borderColor="black"
              placeholder="전화번호"
            />
            <Input
              h="30px"
              w="200px"
              display="block"
              mb="3"
              borderColor="black"
              placeholder="이메일"
            />
          </Box>
          <Box m="10px" p="2">
            <Heading size="md">2. 배송 정보</Heading>
            <Center p="10px">
              <Divider orientation="horizontal" />
            </Center>
            <Box>
              <Input
                h="30px"
                w="200px"
                display="block"
                mb="3"
                borderColor="black"
                placeholder="받으시는 분"
              />
              <Input
                h="30px"
                w="200px"
                mb="3"
                borderColor="black"
                placeholder="받으실 곳"
              />

              <Input
                display="block"
                h="30px"
                w="400px"
                mb="3"
                borderColor="black"
              />
              <Input
                display="block"
                h="30px"
                w="200px"
                mb="3"
                borderColor="black"
                placeholder="전화번호"
              />

              <Input
                display="block"
                h="30px"
                w="400px"
                mb="3"
                borderColor="black"
                placeholder="배송메모"
              />
            </Box>
          </Box>
          <Box m="10px" p="2" pl="5">
            <Heading size="md">3. 결제수단</Heading>
            <Center p="10px">
              <Divider orientation="horizontal" />
            </Center>
            <Button
              size="md"
              h="50px"
              w="200px"
              border="1px"
              borderColor="gray"
              m="2"
            >
              일반 결제
            </Button>
            <Button
              size="md"
              h="50px"
              w="200px"
              border="1px"
              borderColor="gray"
              m="2"
            >
              간편 결제
            </Button>
          </Box>
        </Box>
        <Box bg="#D4BBDD" w="300px" h="800">
          <VStack p="4">
            <Box w="100%" h="30">
              <Heading size="md" align="center">
                결제정보
              </Heading>
            </Box>
            <Box w="100%" h="200" border="1px">
              시집이미지
            </Box>
            <Box w="100%" h="420" border="1px">
              결제된 내용
            </Box>
            <Box w="100%" align="center" justify="center">
              <Button
                colorScheme="blue"
                m="1"
                w="90%"
                onClick={onClickPayButton}
              >
                결제하기
              </Button>
              <Button
                colorScheme="blue"
                m="1"
                w="90%"
                onClick={() => {
                  navigate('/');
                }}
              >
                결제취소
              </Button>
            </Box>
          </VStack>
        </Box>
      </HStack>
      <Flex h="5"></Flex>
    </VStack>
  );
}
export default OrderPay;

{
  /* <div margin='25px'>
      <Flex
        p="2"
        h="70"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px"
        marginTop='50px'
        marginLeft='100px'
        
      >
        <Box p="4" w="90%">
          <Text fontSize='4xl' fontWeight='bold'>결제하기</Text>
        </Box>
        <Box p="1" w="10%">
          <CloseButton size="3xl" />
        </Box>
      </Flex>

      <Flex marginLeft='100px' marginRight='100px'>
        <Box p="4" w="67%" h="full">
          <Box w="100%" h="10%" textAlign="left">
            <Text fontSize='2xl' fontWeight='bold'>1. 주문자 정보</Text>
          </Box>
          <Box p="2" w="100%" h="25%" border="1px" borderColor="black" >
            <Input w="80%" mb="3" borderColor="black" placeholder="이름" />
            <Input w="80%" mb="3" borderColor="black" placeholder="전화번호" />
            <Input w="80%" mb="3" borderColor="black" placeholder="이메일" />
          </Box>
          <Box w="100%" h="10%" textAlign="left" marginTop='15px'>
            <Text fontSize='2xl' fontWeight='bold'>2. 배송 정보</Text>
          </Box>
          <Box p="2" w="100%" h="55%" border="1px" borderColor="black">
            <Input w="80%" mb="3" borderColor="black" placeholder="이름" />
            <Input w="80%" mb="3" borderColor="black" placeholder="전화번호" />
            <Input w="80%" mb="3" borderColor="black" placeholder="이메일" />
            <Input w="80%" mb="3" borderColor="black" placeholder="이름" />
            <Input w="80%" mb="3" borderColor="black" placeholder="전화번호" />
          </Box>

        </Box>
        <Box p="4" w="33%" h="730">
          <Center p="2" w="100%" h="10%">
            결제정보
          </Center>
          <Box p="2" w="100%" h="40%" border="1px" borderColor="black">
            <Box p="2" w="100%" h="80%">
              시집이름 등 정보
            </Box>
            <Box p="2" w="100%" h="20%">
              가격 정보
            </Box>
          </Box>
          <Center p="2" w="100%" h="10%">
            결제수단선택
          </Center>
          <Flex
            p="2"
            w="100%"
            h="30%"
            justifyContent="center"
            border="1px"
            borderColor="black"
          >
            <Button colorScheme="blue" m="1" w="20%" fontSize="1rem">
              네이버페이
            </Button>
            <Button colorScheme="blue" m="1" w="20%" fontSize="1rem">
              카카오페이
            </Button>
            <Button colorScheme="blue" m="1" w="20%" fontSize="1rem">
              카드결제
            </Button>
            <Button colorScheme="blue" m="1" w="20%" fontSize="1rem">
              무통장입금
            </Button>
          </Flex>
          <Flex
            p="2"
            w="100%"
            h="10%"
            justifyContent="center"
            alignItems="center"
          >
            <Button colorScheme="blue" m="1" w="90%" onClick={onClickPayButton}>
              결제하기
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div> */
}

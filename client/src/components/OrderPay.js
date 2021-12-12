import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

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
import { useSelector } from 'react-redux';

const testOrderInput = {
  order: {
    price: 47000,
    name: '김철수',
    delivery_name: '이영희',
    address: '서울시 강남구 강남동 11번지',
    post_code: '10101',
    email: 'yuliekorea@gmail.com',
    phone: '01012341234',
  },
  book: {
    title: '너에게 보내는 시집',
    letter: '편지 내용...',
    flower_id: '61b065c6dd874c208dee0bc3',
    contents: [
      {
        type: 'poem',
        poem_id: '61b065c6dd874c208dee0bc3',
      },
      {
        type: 'poem',
        poem_id: '61b066202f194ac7dd807aef',
      },
      {
        type: 'text',
        text_content: '자유글 내용...',
      },
      {
        type: 'text',
        text_content: '자유글 내용 222...',
      },
    ],
    font: '바른글씨체',
    color: 'beige',
  },
};

function OrderPay({ history }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    email: '',
    delivery_name: '',
    address: '',
    post_code: '',
    memo: '',
  });

  const { name, phone, email, delivery_name, address, post_code, memo } =
    inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const {
    title,
    letter_content,
    user_flower_id,
    free_content,
    userfont,
    usercolor,
  } = useSelector((state) => ({
    title: state.title,
    letter_content: state.letter_content,
    user_flower_id: state.user_flower_id,
    free_content: state.free_content,
    userfont: state.userfont,
    usercolor: state.usercolor,
  }));

  const orderInfo = {
    order: {
      price: 47000,
      name: name,
      delivery_name: delivery_name,
      address: address,
      post_code: post_code,
      email: email,
      phone: phone,
    },
    book: {
      title: title,
      letter: letter_content,
      flower_id: user_flower_id,
      contents: [
        {
          type: 'poem',
          poem_id: '61b065c6dd874c208dee0bc3',
        },
        {
          type: 'poem',
          poem_id: '61b066202f194ac7dd807aef',
        },
        {
          type: 'text',
          text_content: free_content,
        },
      ],
      font: userfont,
      color: usercolor,
    },
  };

  const onClickPayButton = async () => {
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/orders`,
      data: testOrderInput,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('주문API 성공', response);
        const order = response.data;
        serverAuth(order.id, order.price);
      })
      .catch((err) => {
        alert('error 주문생성');
        console.log(err);
      });
  };

  const serverAuth = (orderId, orderAmount) => {
    console.log('SERVER AUTH STARTED');
    window.AUTHNICE.requestPay({
      clientId: process.env.REACT_APP_CLIENT_ID,
      method: 'naverpayCard',
      orderId: orderId,
      amount: orderAmount,
      goodsName: '꽃편지-시집',
      returnUrl: 'http://127.0.0.1:8000/pay',
      fnError: function (result) {
        console.log(result.errorMsg);
        serverAuth(orderId, orderAmount);
      },
    });
  };

  return (
    <>
      <Helmet>
        <script src="https://pay.nicepay.co.kr/v1/js/" type="text/javascript" />
      </Helmet>
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
                name="name"
                value={name}
                onChange={onChange}
              />
              <Input
                h="30px"
                w="200px"
                display="block"
                mb="3"
                borderColor="black"
                placeholder="전화번호"
                name="phone"
                value={phone}
                onChange={onChange}
              />
              <Input
                h="30px"
                w="200px"
                display="block"
                mb="3"
                borderColor="black"
                placeholder="이메일"
                name="email"
                value={email}
                onChange={onChange}
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
                  name="delivery_name"
                  value={delivery_name}
                  onChange={onChange}
                />
                <Input
                  h="30px"
                  w="200px"
                  mb="3"
                  borderColor="black"
                  placeholder="우편번호"
                  name="post_code"
                  value={post_code}
                  onChange={onChange}
                />

                <Input
                  display="block"
                  h="30px"
                  w="400px"
                  mb="3"
                  borderColor="black"
                  placeholder="주소"
                  name="address"
                  value={address}
                  onChange={onChange}
                />

                <Input
                  display="block"
                  h="30px"
                  w="400px"
                  mb="3"
                  borderColor="black"
                  placeholder="배송메모"
                  name="memo"
                  value={memo}
                  onChange={onChange}
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
    </>
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

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import {
  Flex,
  Box,
  Input,
  Center,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Divider,
  FormControl,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FinalPreview from './FinalPreview';

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
    poems,
  } = useSelector((state) => ({
    title: state.title,
    letter_content: state.letter_content,
    user_flower_id: state.user_flower_id,
    free_content: state.free_content,
    userfont: state.userfont,
    usercolor: state.usercolor,
    poems: state.poems,
  }));

  const trimmedLetter = letter_content.replace(/\n|\r/g, ' ');

  const poemList = poems.map((content) => ({
    type: 'poem',
    poem_id: content['_id'],
  }));

  const freecontentList = free_content.map((content) => ({
    type: 'text',
    text_content: content,
  }));

  const contentList = [...poemList, ...freecontentList];

  const free_content_count = free_content.length;
  const free_content_price = free_content_count * 3000;
  const totalPrice = 48000 + free_content_price;

  const orderInfo = {
    order: {
      price: totalPrice,
      name: name,
      delivery_name: delivery_name,
      address: address,
      post_code: post_code,
      email: email,
      phone: phone,
      delivery_memo: memo,
    },
    book: {
      title: title,
      letter: trimmedLetter,
      flower_id: user_flower_id,
      contents: contentList,
      font: userfont,
      color: usercolor,
    },
  };

  const onClickPayButton = async () => {
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/orders`,
      data: orderInfo,
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
      method: 'card',
      orderId: orderId,
      amount: orderAmount,
      goodsName: '꽃편지-시집',
      returnUrl: `${process.env.REACT_APP_API_URL}/pay`,
      fnError: function (result) {
        console.log('임의에러발생: ', result.errorMsg);
      },
    });
  };

  const passCheck = () => {
    if (
      name === '' ||
      phone === '' ||
      email === '' ||
      memo === '' ||
      delivery_name === '' ||
      address === '' ||
      post_code === ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleCheck = () => {
    if (passCheck() === true) {
      onClickPayButton();
    } else {
      alert('필수 입력값이 비어있습니다. 확인해주세요');
    }
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
            <FormControl id="orderInfo">
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
            </FormControl>

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
                {/*시집 이미지*/}
                <FinalPreview userfont={userfont} usercolor={usercolor} />
              </Box>
              <Box w="100%" h="420" border="1px">
                <HStack>
                  <Text fontSize="2xl" marginLeft="20px" marginTop="20px">
                    시집 X 1 48000
                  </Text>
                </HStack>
                <Text fontSize="2xl" marginLeft="20px" marginTop="20px">
                  자유글 X {free_content_count} {free_content_price}
                </Text>
                <Divider w="80%" marginTop="100px" marginLeft="20px" />
                <HStack marginTop="20px">
                  <Text fontSize="2xl" marginLeft="20px">
                    배송
                  </Text>

                  <Text fontSize="2xl" fontWeight="bold">
                    무료
                  </Text>
                </HStack>
                <Divider w="80%" marginTop="20px" marginLeft="20px" />
                <HStack marginTop="20px">
                  <Text fontSize="2xl" marginLeft="20px" fontWeight="bold">
                    합계
                  </Text>

                  <Text fontSize="2xl" fontWeight="bold">
                    {totalPrice}
                  </Text>
                </HStack>
              </Box>
              <Box w="100%" align="center" justify="center">
                <Button colorScheme="blue" m="1" w="90%" onClick={handleCheck}>
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

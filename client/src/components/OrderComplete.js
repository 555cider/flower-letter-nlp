import React from 'react';
import { Box, VStack, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

function OrderComplete({ history }) {
  const navigate = useNavigate();
  return (
    <>
      <VStack w="100%" h="100vh" align="center" justifyContent="center">
        <Box p="2px" w="650px" h="40%" align="center">
          <Text fontSize="2xl">🌷</Text>
          <Text fontSize="4xl" fontWeight="600">
            Thank you!
          </Text>
          <VStack
            borderRadius="10px"
            bg="beige"
            w="70%"
            h="40%"
            m="7px"
            justify="center"
          >
            <Box align="left">
              <Text m="3px">이메일로 주문내역이 발송되었습니다.</Text>
              <Text m="3px" fontWeight="600">
                주문번호: #ELICE1234567
              </Text>
              <Text m="3px">빠르게 제작하여 보내드릴게요!</Text>
            </Box>
          </VStack>
          <Button
            onClick={() => {
              navigate('/');
            }}
            bgGradient="linear(to-r, orange.200, yellow.300, green.200, teal.200 )"
            color="white"
            w="150px"
          >
            홈으로!
          </Button>
        </Box>
      </VStack>
    </>
  );
}

export default OrderComplete;

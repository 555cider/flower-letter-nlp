import React from 'react';
import { Box, VStack, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { WarningTwoIcon } from '@chakra-ui/icons';

function ErrorPage({ history }) {
  const navigate = useNavigate();
  return (
    <>
      <VStack w="100%" h="100vh" align="center" justifyContent="center">
        <Box p="2px" w="650px" h="40%" align="center">
          <Text fontSize="2xl">🥀</Text>
          <Text fontSize="4xl" fontWeight="600">
            Error!!
          </Text>
          <VStack
            borderRadius="10px"
            bg="#FFE6A8"
            w="70%"
            h="50%"
            m="7px"
            justify="center"
          >
            <Box align="left" fontFamily={'EliceRegular'} align="center">
              <WarningTwoIcon w={5} h={5}></WarningTwoIcon>
              <br />
              <Text m="3px" fontWeight="600">
                에러가 발생했습니다!
              </Text>
              <Text m="3px">나중에 다시 시도해주세요.</Text>
            </Box>
          </VStack>
          <Button
            onClick={() => {
              navigate('/');
            }}
            bgGradient="linear(to-t, #FFE6A8, #D4BBDD, #FFE6A8 )"
            color="white"
            w="150px"
            _hover={{ bg: '#D4BBDD', color: 'white' }}
          >
            홈으로 돌아가기
          </Button>
        </Box>
      </VStack>
    </>
  );
}

export default ErrorPage;

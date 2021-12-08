import React from 'react';
import StepsLetter from '../StepsLetter';
import { Flex, HStack, Box, Button, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function FinalReview() {
  const navigate = useNavigate();
  return (
    <div>
      <StepsLetter />
      <HStack h="70vh" p="2" ml="5" mr="5" align="center" justify="center">
        {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
        <Flex w="60%" h="100%" border="1px" borderRadius="10px" mr="1">
          {/* 왼쪽 박스 */}
          시집검토 단계
        </Flex>
        <Flex w="40%" h="100%" border="1px" borderRadius="10px" ml="1">
          {/* 오른쪽 박스 */}
        </Flex>
      </HStack>
      <Flex pl="6" pr="6" h="10%" w="100%">
        <Box>
          <Button
            w="30vh"
            h="7vh"
            bg="skyblue"
            color="white"
            fontSize="3vh"
            onClick={() => {
              navigate('/create/freecontent');
            }}
          >
            이전 단계
          </Button>
        </Box>
        <Spacer />
        <Box>
          <Button
            w="30vh"
            h="7vh"
            bg="skyblue"
            color="white"
            fontSize="3vh"
            onClick={() => {
              navigate('/orders');
            }}
          >
            다음 단계
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

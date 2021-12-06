import React from 'react';
import StepsLetter from '../StepsLetter';
import EditContainer from './EditContainer';
import { Flex, HStack, Box, Button, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function FlowerLang() {
  const navigate = useNavigate();
  return (
    <div>
      <StepsLetter />
      <HStack h='70vh' p='2' ml='5' mr='5' align='center' justify='center'>
        {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
        <Flex w='60%' h='100%' border='1px' borderRadius='10px' mr='1'>
          {/* 왼쪽 박스 */}
          꽃말선택 단계
        </Flex>
        <Flex w='40%' h='100%' border='1px' borderRadius='10px' ml='1' align='center' justify='center'>
          {/* 오른쪽 박스 */}
          <div className='flowerbox' align='center'>
            {/* 스크롤 박스 */}
            <Button className='flowerbutton' m='2' w='90%' h='100px' bg='skyblue' fontWeight='600' color='white'>
              Color
            </Button>
            <Button className='flowerbutton' m='2' w='90%' h='100px' bg='skyblue' fontWeight='600' color='white'>
              Color
            </Button>
            <Button className='flowerbutton' m='2' w='90%' h='100px' bg='skyblue' fontWeight='600' color='white'>
              Color
            </Button>
            <Button className='flowerbutton' m='2' w='90%' h='100px' bg='skyblue' fontWeight='600' color='white'>
              Color
            </Button>
            <Button className='flowerbutton' m='2' w='90%' h='100px' bg='skyblue' fontWeight='600' color='white'>
              Color
            </Button>
          </div>
        </Flex>
      </HStack>
      <Flex pl='6' pr='6' h='10%' w='100%'>
        <Box>
          <Button
            w='30vh'
            h='7vh'
            bg='skyblue'
            color='white'
            fontSize='3vh'
            onClick={() => {
              navigate('/create/keyword');
            }}>
            이전 단계
          </Button>
        </Box>
        <Spacer />
        <Box>
          <Button
            w='30vh'
            h='7vh'
            bg='skyblue'
            color='white'
            fontSize='3vh'
            onClick={() => {
              navigate('/create/bookcover');
            }}>
            다음 단계
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

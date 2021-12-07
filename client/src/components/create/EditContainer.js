import React from 'react';
import { Flex, Center, Box, Button, Image, PortalManager, Spacer } from '@chakra-ui/react';
import PoemContainer from './PoemContainer';
import { useNavigate } from 'react-router';

export default function EditContainer({ prevLink, nextLink, action }) {
  const navigate = useNavigate()

  const clickNextButton = () =>{

  }

  return (
    <Flex pl='6' pr='6' h='10%' w='100%'>
      <Box>
        <Button w='30vh' h='7vh' bg='skyblue' color='white' fontSize='3vh' onClick={() => { navigate(prevLink); }}>
          이전 단계
        </Button>
      </Box>
      <Spacer />
      <Box>
        <Button w='30vh' h='7vh' bg='skyblue' color='white' fontSize='3vh' onClick={() => { navigate(nextLink); }}> 
        다음 단계
        </Button>
      </Box>
    </Flex>
  );
}

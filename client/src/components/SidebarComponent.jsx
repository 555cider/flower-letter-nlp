import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Link, VStack, Box, Image } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { HamburgerIcon } from '@chakra-ui/icons';

function SidebarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navigate = useNavigate();

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen} backgroundColor={'#D3B1C2'}>
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bgGradient='linear(to-b, rgba(212, 187, 221, 1),  rgba(251, 237, 224, 1),  )'>
          <DrawerCloseButton size='lg' color='white' />
          <DrawerBody flexDirection='column' justifyContent='space-between'>
            <br />
            <VStack>
              <Link
                w='160px'
                h='110px'
                mb='3'
                onClick={() => {
                  navigate('/');
                }}>
                <Image src='img/logoimg.png' alt='logo' borderRadius='15px' border='2px' borderColor='#A49393' />
              </Link>
              <Button
                _hover={{ backgroundColor: '#A49393', color: 'white', fontWeight: '600' }}
                onClick={() => navigate('/start')}
                w='140px'
                backgroundColor='white'
                border='1px'
                borderColor='#A49393'
                color='#A49393'
                borderRadius='20px'
                fontWeight='500'>
                시집 만들러 가기
              </Button>
              <Box h='10'></Box>
              <Link
                _hover={{ color: '#613659', fontWeight: '600' }}
                fontSize='30px'
                fontWeight='400'
                color='#A49393'
                onClick={() => {
                  navigate('/about');
                }}>
                About us
              </Link>
              <br />
              <Link
                _hover={{ color: '#613659', fontWeight: '600' }}
                fontSize='30px'
                fontWeight='400'
                color='#A49393'
                onClick={() => {
                  navigate('/howtouse');
                }}>
                How To use
              </Link>
              <br />
              <Link
                _hover={{ color: '#613659', fontWeight: '600' }}
                fontSize='30px'
                fontWeight='400'
                color='#A49393'
                onClick={() => {
                  navigate('/question');
                }}>
                FAQ
              </Link>
              <br />
              <Link
                _hover={{ color: '#613659', fontWeight: '600' }}
                fontSize='30px'
                fontWeight='400'
                color='#A49393'
                onClick={() => {
                  navigate('/question');
                }}>
                문의하기
              </Link>
              <br />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default SidebarComponent;

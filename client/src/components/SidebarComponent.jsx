import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,Link,VStack } from '@chakra-ui/react';
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
        <HamburgerIcon/>
      </Button>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent backgroundColor='#FBEDE0'>
          <DrawerCloseButton />
          <DrawerHeader fontSize='50px'>꽃편지</DrawerHeader>

          <DrawerBody flexDirection='column' justifyContent='space-between' >
            <br />
            <VStack>
            <Link fontSize='40px'
              onClick={() => {
                navigate('/about');
              }}>
              About us
            </Link>
            <br />
            <Link fontSize='40px'
              onClick={() => {
                navigate('/howtouse');
              }}>
              How To use
            </Link>
            <br />
            <Link fontSize='40px'
              onClick={() => {
                navigate('/question');
              }}>
              FAQ
            </Link>
            <br />
            <Link fontSize='40px'
              onClick={() => {
                navigate('/question');
              }}>
              문의하기
            </Link>
            <br/>
            <Button onClick={()=>navigate('/start')} backgroundColor="#D3B1C2">시집 만들러</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default SidebarComponent;

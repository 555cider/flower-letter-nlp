import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  VStack,
  Box,
  Image,
  Icon,
  Text,
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

function SidebarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navigate = useNavigate();

  return (
    <>
      <Box
        position="fixed"
        ref={btnRef}
        onClick={onOpen}
        w="60px"
        h="60px"
        align="center"
        ml="3"
        mt="3"
      >
        <Icon
          as={HamburgerIcon}
          w={12}
          h={12}
          color={'black'}
          borderColor="black"
          // backgroundColor={'#FBEDE0'}
          borderRadius="10px"
          border="2px"
          style={{ cursor: 'pointer' }}
          _hover={{ color: 'white' }}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent bgGradient="linear(to-b, rgba(212, 187, 221, 1),  rgba(251, 237, 224, 1),  )">
          <DrawerCloseButton size="lg" color="white" />
          <DrawerBody flexDirection="column" justifyContent="space-between">
            <br />
            <VStack>
              <Link
                w="160px"
                h="110px"
                mb="10"
                onClick={() => {
                  navigate('/');
                }}
              >
                <Image src="img/logoimg.png" alt="logo" borderRadius="15px" />
              </Link>
              <Box
                h="10"
                borderTop={'2px'}
                w="100%"
                borderColor={'white'}
              ></Box>

              <Link
                _hover={{ color: '#613659', fontWeight: '600' }}
                fontSize="30px"
                fontWeight="400"
                color="#A49393"
                onClick={() => {
                  navigate('/about');
                }}
              >
                <NavLink exact end to="/about">
                  <Text fontFamily={'EliceRegular'}>About us</Text>
                </NavLink>
              </Link>
              <br />
              <Link
                _hover={{ color: '#613659', fontWeight: '600' }}
                fontSize="30px"
                fontWeight="400"
                color="#A49393"
                onClick={() => {
                  navigate('/howtouse');
                }}
              >
                <NavLink exact end to="/howtouse">
                  <Text fontFamily={'EliceRegular'}>How To use</Text>
                </NavLink>
              </Link>

              <br />
              <Link
                _hover={{ color: '#613659', fontWeight: '600' }}
                fontSize="30px"
                fontWeight="400"
                color="#A49393"
                onClick={() => {
                  navigate('/question');
                }}
              >
                <NavLink exact end to="/question">
                  <Text fontFamily={'EliceRegular'}>문의하기</Text>
                </NavLink>
              </Link>
              <Box
                h="10"
                borderBottom={'2px'}
                w="100%"
                borderColor={'white'}
              ></Box>
              <Box h="10" w="100%"></Box>
              <Button
                _hover={{
                  backgroundColor: '#D4BBDD',
                  color: 'white',
                  fontWeight: '600',
                }}
                onClick={() => navigate('/start ')}
                w="220px"
                h="50px"
                backgroundColor="white"
                border="2px"
                borderColor="#D4BBDD"
                color="#D4BBDD"
                borderRadius="20px"
                fontWeight="600"
                fontSize="xl"
              >
                <Text fontFamily={'EliceBold'}>시집 만들러 가기</Text>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default SidebarComponent;

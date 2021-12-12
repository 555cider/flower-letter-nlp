import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export default function CreatePageEx({ exText }) {
  return (
    <>
      <Flex
        w="65%"
        bg="white"
        color="#A49393"
        borderRadius={'10px'}
        justify={'center'}
        borderColor={'#A49393'}
        border="2px"
      >
        <Text fontFamily={'EliceRegular'} fontSize={'lg'}>
          {exText}
        </Text>
      </Flex>
    </>
  );
}

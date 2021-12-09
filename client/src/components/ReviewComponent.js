import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Link,
  Container,
  Spacer,
  HStack,
} from '@chakra-ui/react';

export default function ReviewComponent({
  w = 'full',
  h = 'full',

  backgroundcolor,
  bgGradient,
}) {
  return (
    <VStack
      w={w}
      h={h}
      //justify={"center"}
      display={'flex'}
      px={useBreakpointValue({ base: 4, md: 8 })}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundColor={backgroundcolor}
      bgGradient={bgGradient}
    >
      <Stack
        align={'flex-start'}
        spacing={6}
        alignItems={'center'}
        whiteSpace={'pre-line'}
      >
        <Text
          color={'white'}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
          marginTop={'50px'}
        >
          User Review
        </Text>

        <Text
          color={'white'}
          //fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
          marginTop={'50px'}
        >
          고객의 생생한 후기를 들어보세요. <br />
          사람들이 꽃편지를 선택하는 이유를 확인하실 수 있습니다.
        </Text>

        <Container display={'flex'} justifyContent={'space-evenly'}>
          <Flex justify={'space-evenly'}>
            <HStack w="150vh" h="100%">
              <Box bg="white" borderRadius="30px" boxSize="400px" p="4">
                <Text>유저리뷰내용</Text>
              </Box>
              <Spacer />
              <Box bg="white" borderRadius="30px" boxSize="400px" p="4">
                <Text>유저리뷰내용</Text>
              </Box>
              <Spacer />
              <Box bg="white" borderRadius="30px" boxSize="400px" p="4">
                <Text>유저리뷰내용</Text>
              </Box>
            </HStack>
          </Flex>
        </Container>

        {/* <Stack direction={"row"}> */}
        {/*
            <Button
            bg={"blue.400"}
            rounded={"full"}
            color={"white"}
            _hover={{ bg: "blue.500" }}
          >
            {buttonName}
          </Button>
            */}
      </Stack>
    </VStack>
  );
}

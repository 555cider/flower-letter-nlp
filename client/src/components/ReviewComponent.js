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
  Avatar,
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
              <VStack
                bg="white"
                borderRadius="30px"
                boxSize="400px"
                p="10"
                justify={'center'}
                align={'center'}
              >
                <Box w="100%">
                  <Text fontFamily={'EliceRegular'} fontSize={'lg'}>
                    "친구에게 시집을 선물하려고 했는데, 어떤 시집을 사야하나
                    고민하다가 찾게 됐어요. 결과적으로 대만족입니다. 편지만
                    작성해도 시집을 알아서 구성해주니까 서점에 하루종일 서서
                    시를 고를 필요가 없어졌어요!"
                  </Text>
                </Box>
                <Box h="2"></Box>
                <Avatar src="https://bit.ly/broken-link" />
                <Text>Python님,</Text>
              </VStack>
              <Spacer />
              <VStack
                bg="white"
                borderRadius="30px"
                boxSize="400px"
                p="10"
                justify={'center'}
                align={'center'}
              >
                <Box w="100%">
                  <Text fontFamily={'EliceRegular'} fontSize={'lg'}>
                    "ㄴ"
                  </Text>
                </Box>
                <Box h="2"></Box>
                <Avatar src="https://bit.ly/broken-link" />
                <Text> Java님,</Text>
              </VStack>
              <Spacer />
              <VStack
                bg="white"
                borderRadius="30px"
                boxSize="400px"
                p="10"
                justify={'center'}
                align={'center'}
              >
                <Box w="100%">
                  <Text fontFamily={'EliceRegular'} fontSize={'lg'}>
                    "친구에게 시집을 선물하려고 했는데, 어떤 시집을 사야하나
                    고민하다가 찾게 됐어요. 결과적으로 대만족입니다. 편지만
                    작성해도 시집을 알아서 구성해주니까 서점에 하루종일 서서
                    시를 고를 필요가 없어졌어요!"
                  </Text>
                </Box>
                <Box h="2"></Box>
                <Avatar src="https://bit.ly/broken-link" />
                <Text>Docker님,</Text>
              </VStack>
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

import {
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Box,
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
          fontFamily={'EliceBold'}
        >
          User Review
        </Text>

        <Text
          color={'white'}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
          fontFamily={'EliceRegular'}
          textAlign={'center'}
          marginTop={'50px'}
        >
          고객의 생생한 후기를 들어보세요. <br />
          사람들이 꽃편지를 선택하는 이유를 확인하실 수 있습니다.
        </Text>

        <Container display={'flex'} justifyContent={'space-evenly'}>
          {/* <Flex justify={'space-evenly'}> */}
          {/* <Flex justify={'center'}> */}
          <HStack
            w="80vw"
            h="100%"
            display={'flex'}
            justifyConten={'center'}
            gap={'30px'}
          >
            <VStack
              bg="white"
              borderRadius="20px"
              boxSize="400px"
              p="10"
              justify={'center'}
              align={'center'}
            >
              <Box w="100%">
                <Text fontFamily={'EliceRegular'} fontSize={'lg'}>
                  "친구에게 시집을 선물하려고 했는데, 어떤 시집을 사야하나
                  고민하다가 찾게 됐어요. 결과적으로 대만족입니다. 편지만
                  작성해도 시집을 알아서 구성해주니까 서점에 하루종일 서서 시를
                  고를 필요가 없어졌어요!"
                </Text>
              </Box>
              <Box h="2"></Box>
              <Avatar src="https://bit.ly/broken-link" />
              <Text>Python님,</Text>
            </VStack>
            <Spacer />
            <VStack
              bg="white"
              borderRadius="20px"
              boxSize="400px"
              p="10"
              justify={'center'}
              align={'center'}
            >
              <Box w="100%">
                <Text fontFamily={'EliceRegular'} fontSize={'lg'}>
                  "시집 커스텀 기능이 좋았어요. 시 내용은 좋은데 뭔가 커버나
                  디자인이 별루인? ㅜㅜ 시집도 많아서 디자인도 편지내용이랑 딱
                  맞게 커스텀하는 기능이 좋아여!!"
                </Text>
              </Box>
              <Box h="2"></Box>
              <Avatar src="https://bit.ly/broken-link" />
              <Text> Java님,</Text>
            </VStack>
            <Spacer />
            <VStack
              bg="white"
              borderRadius="20px"
              boxSize="400px"
              p="10"
              justify={'center'}
              align={'center'}
            >
              <Box w="100%">
                <Text fontFamily={'EliceRegular'} fontSize={'lg'}>
                  "역발상 아이디어가 괜찮았습니다. 보통은 시집을 찾고 편지를
                  그에 맞춰서 쓰곤 하죠. 시집을 완독하지 않는 경우도 있어서 시
                  중에 원래 의도와 다른 시가 포함되는 경우도 있는 것 같습니다.
                  이 서비스는 편지 내용을 분석해서 시를 추천해주기 때문에 원래
                  의도와 맞는 내용의 시들이 골라져서 좋은 것 같습니다."
                </Text>
              </Box>
              <Box h="2"></Box>
              <Avatar src="https://bit.ly/broken-link" />
              <Text>Docker님,</Text>
            </VStack>
          </HStack>
          {/* </Flex> */}
        </Container>
      </Stack>
    </VStack>
  );
}

import {
  Flex,
  Spacer,
  Box,
  VStack,
  Stack,
  Text,
  Center,
  HStack,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function LeftImage({
  w,
  h,
  backgroundImage,
  text,
  imgUrl,
  backgroundImg,
  bgGradient,
  backgroundcolor,
  textColor,
}) {
  return (
    <HStack
      w={w}
      h={h}
      justify={'center'}
      //px={useBreakpointValue({ base: 4, md: 8 })}

      backgroundPosition="center"
      backgroundSize="cover"
      backgroundImage={backgroundImg}
      backgroundColor={backgroundcolor}
      bgGradient={bgGradient}
    >
      <Center w="80vh" h="full">
        <Image src={imgUrl} boxSize="500px" />
      </Center>
      <Center w="60vh" h="full">
        <Text
          // className="sa sa-left" 스크롤애니메이션 클래스
          color={textColor}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
        >
          {text}
        </Text>
      </Center>
    </HStack>
  );
}

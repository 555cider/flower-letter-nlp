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

export default function RightImage({
  w,
  h,
  text,
  imgUrl,
  backgroundImg,
  backgroundcolor,
  bgGradient,
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
      <Center w="60vh" h="full">
        <Text
          className="sa sa-right"
          lineHeight={1.2}
          color={textColor}
          fontWeight={600}
          fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
        >
          {text}
        </Text>
      </Center>
      <Center w="80vh" h="full">
        <Image src={imgUrl} boxSize="500px" />
      </Center>
    </HStack>
  );
}

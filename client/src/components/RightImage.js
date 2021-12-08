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
    >
      <Center w="40%" h="full">
        <Text
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
        >
          {text}
        </Text>
      </Center>
      <Center w="60vh" h="full">
        <Image src={imgUrl} boxSize="400px" />
      </Center>
    </HStack>
  );
}

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
    >
      <Center w="40vh" h="full">
        <Image src={imgUrl} boxSize="500px" />
      </Center>
      <Center w="60vh" h="full">
        <Text
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

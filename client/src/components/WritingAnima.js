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

export default function WritingAnima({
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
      border="1px"
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
      <Box w="35%" h="80%" border="1px">
        <Text
          className="sa sa-right"
          lineHeight={1.2}
          color={textColor}
          fontWeight={600}
          fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
        >
          {text}
        </Text>
      </Box>
    </HStack>
  );
}

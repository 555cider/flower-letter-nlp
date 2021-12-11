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
  text2,
  imgUrl,
  backgroundImg,
  backgroundcolor,
  bgGradient,
  textColor,
  contentText,
}) {
  const saTriggerMargin = 300;
  const saElementList = document.querySelectorAll('.sa');

  const saFunc = function () {
    for (const element of saElementList) {
      if (!element.classList.contains('show')) {
        if (
          window.innerHeight >
          element.getBoundingClientRect().top + saTriggerMargin
        ) {
          element.classList.add('show');
        }
      }
    }
  };

  window.addEventListener('load', saFunc);
  window.addEventListener('scroll', saFunc);
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
        <VStack className="sa sa-right">
          <Text
            lineHeight={1.2}
            color={textColor}
            fontWeight={600}
            fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
          >
            {text}
          </Text>
          <Text
            lineHeight={1.2}
            color={textColor}
            fontWeight={600}
            fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
            textAlign={'right'}
          >
            {text2}
          </Text>
          <Text
            color={textColor}
            fontFamily={'EliceRegular'}
            fontWeight={600}
            lineHeight={1.8}
            fontSize={useBreakpointValue({ base: 'xl', md: 'xl' })}
            textAlign={'initial'}
          >
            {contentText}
          </Text>
        </VStack>
      </Center>
      <Center w="80vh" h="full">
        <Image src={imgUrl} boxSize="500px" borderRadius={'15px'} />
      </Center>
    </HStack>
  );
}

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
            fontFamily={'Sungsil'}
            // fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
            fontSize={'3rem'}
          >
            {text}
          </Text>
          <Text
            lineHeight={1.8}
            color={textColor}
            fontWeight={600}
            fontFamily={'Sungsil'}
            // fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
            fontSize={'2rem'}
            textAlign={'right'}
          >
            {text2}
          </Text>
          <Text
            color={textColor}
            fontFamily={'Sungsil'}
            // fontWeight={600}
            lineHeight={1.5}
            // fontSize={useBreakpointValue({ base: 'xl', md: 'xl' })}
            fontSize={'1.5rem'}
            textAlign={'initial'}
            wordBreak={'keep-all'}
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

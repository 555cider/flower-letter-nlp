import { Box, Text, VStack, Button } from '@chakra-ui/react';
import ReactTypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router';

export default function WritingAnima({
  w,
  h,
  text,
  imgUrl,
  backgroundImg,
  backgroundcolor,
  bgGradient,
  textColor,
  lettertext,
  isbutton = false,
  buttonName,
  buttonBorder,
  buttonBorderColor,
  buttonUrl,
  buttonColor,
  buttonTextColor,
  hoverset,
}) {
  const ReactTypingEffectDemo = () => {
    return (
      <>
        {/* 편지 타이핑 애니메이션 */}
        <ReactTypingEffect
          text={[`안녕? 우리가 친구로 지낸지 벌써 3년이 지났다니 믿기지 않아!`]}
        />
      </>
    );
  };
  const navigate = useNavigate();
  const button_Url = buttonUrl;

  return (
    <VStack
      w={w}
      h={h}
      justify={'center'}
      //px={useBreakpointValue({ base: 4, md: 8 })}

      backgroundPosition="center"
      backgroundColor={backgroundcolor}
      bgGradient={bgGradient}
    >
      <Box
        w="500px"
        h="72%"
        backgroundSize="cover"
        backgroundImage={backgroundImg}
        p="9"
        borderRadius="10px"
        mb="5"
      >
        <Text
          ml="10"
          color={textColor}
          fontWeight={600}
          fontSize="lg"
          fontFamily={'HandWrite'}
        >
          은지에게
        </Text>
        <Text
          mt="3"
          ml="3"
          mr="3"
          lineHeight={2}
          color={textColor}
          fontWeight={600}
          fontSize="lg"
          fontFamily="HandWrite"
          // fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
        >
          <ReactTypingEffectDemo></ReactTypingEffectDemo>
          {text}
        </Text>
        <Box h="160px"></Box>
        <Text
          ml="20"
          color={'#613659'}
          fontWeight={600}
          fontSize="xl"
          fontFamily={'HandWrite'}
          mt="40"
        >
          지금 바로 편지쓰기를 시작해보세요!!
        </Text>
      </Box>
      {isbutton ? (
        <Button
          w="250px"
          h="50px"
          fontSize="xl"
          fontWeight="600"
          fontFamily={'EliceRegular'}
          bg={buttonColor}
          border={buttonBorder}
          borderColor={buttonBorderColor}
          rounded={'full'}
          color={buttonTextColor}
          _hover={hoverset}
          onClick={() => {
            navigate(button_Url);
          }}
        >
          {buttonName}
        </Button>
      ) : null}
    </VStack>
  );
}

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
}) {
  const ReactTypingEffectDemo = () => {
    return (
      <>
        {/* 편지 타이핑 애니메이션 */}
        <ReactTypingEffect
          text={[`타이핑 애니메이션 내용은 여기 작성 가능합니다.`]}
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
        <Text ml="10" color={textColor} fontWeight={600} fontSize="lg">
          사람에게
        </Text>
        <Text
          mt="3"
          ml="3"
          mr="3"
          lineHeight={2}
          color={textColor}
          fontWeight={600}
          fontSize="lg"
          // fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
        >
          <ReactTypingEffectDemo></ReactTypingEffectDemo>
          {text}
        </Text>
      </Box>
      {isbutton ? (
        <Button
          w="250px"
          h="50px"
          fontSize="xl"
          fontWeight="600"
          bg={buttonColor}
          border={buttonBorder}
          borderColor={buttonBorderColor}
          rounded={'full'}
          color={buttonTextColor}
          _hover={{ bg: 'blue.500' }}
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

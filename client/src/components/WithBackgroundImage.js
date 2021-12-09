import {
  Stack,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function WithBackgroundImage({
  isbutton = false,
  buttonName,
  buttonBorder,
  buttonBorderColor,
  buttonUrl,
  buttonColor,
  buttonTextColor,
  backgroundImg,
  bgGradient,
  text,
  w = 'full',
  h = 'full',
  textcolor,
  backgroundcolor,
  link,
}) {
  const navigate = useNavigate();

  const button_Url = buttonUrl;
  // 스크롤 애니메이션
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
    <VStack
      w={w}
      h={h}
      justify={'center'}
      px={useBreakpointValue({ base: 4, md: 8 })}
      backgroundImage={backgroundImg}
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
          className="sa sa-up"
          color={textcolor}
          fontWeight={600}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
        >
          {text}
        </Text>

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

        {/* </Stack> */}
        <Link>{link}</Link>
      </Stack>
    </VStack>
  );
}

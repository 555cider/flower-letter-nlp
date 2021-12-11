import {
  Stack,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';

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
  contentText,
  contentfont,
  hoverset,
}) {
  const navigate = useNavigate();

  const button_Url = buttonUrl;

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
          // className="sa sa-up" 스크롤 애니메이션 클래스
          color={textcolor}
          fontWeight={600}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
          fontFamily={'EliceBold'}
        >
          {text}
        </Text>
        <Text
          color={textcolor}
          fontFamily={contentfont}
          fontWeight={600}
          lineHeight={1.8}
          fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
          textAlign={'center'}
        >
          {contentText}
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
            _hover={hoverset}
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

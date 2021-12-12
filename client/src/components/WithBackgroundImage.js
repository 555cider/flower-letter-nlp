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
  buttonFontWeight = '600',
  buttonFontSize = '2.5rem',
  buttonFont = 'Sungsil',
  backgroundImg,
  bgGradient,
  text,
  w = 'full',
  h = 'full',
  textcolor,
  textfont = 'sungsil',
  textsize = '3rem',
  textFontWeight = '600',
  backgroundcolor,
  link,
  contentText,
  contentfont,
  contentLineHeight = 1.8,
  contentTextSize = '1.5rem',
  hoverset,
}) {
  const navigate = useNavigate();

  const button_Url = buttonUrl;

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
        className="sa sa-up"
      >
        <Text
          color={textcolor}
          fontWeight={textFontWeight}
          lineHeight={1.2}
          // fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
          fontSize={textsize}
          fontFamily={textfont}
        >
          {text}
        </Text>
        <Text
          color={textcolor}
          fontFamily={contentfont}
          // fontWeight={600}
          lineHeight={contentLineHeight}
          // fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
          fontSize={contentTextSize}
          textAlign={'center'}
          fontFamily={'Sungsil'}
        >
          {contentText}
        </Text>
        {isbutton ? (
          <Button
            w="250px"
            h="60px"
            fontSize={buttonFontSize}
            fontWeight={buttonFontWeight}
            fontFamily={buttonFont}
            paddingBottom={'10px'}
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

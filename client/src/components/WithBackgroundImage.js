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
  buttonName,
  backgroundImg,
  text,
  w = 'full',
  h = 'full',
  textcolor,
  backgroundcolor,
  isbutton = false,
  buttonColor,
  link,
  buttonUrl,
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
    >
      <Stack
        align={'flex-start'}
        spacing={6}
        alignItems={'center'}
        whiteSpace={'pre-line'}
      >
        <Text
          color={textcolor}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
        >
          {text}
        </Text>

        {isbutton ? (
          <Button
            bg={buttonColor}
            rounded={'full'}
            color={'black'}
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

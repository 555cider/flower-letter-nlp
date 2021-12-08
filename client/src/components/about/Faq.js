import React from 'react';
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

export default function Faq() {
  return (
    <VStack
      w={'full'}
      h={'full'}
      justify={'center'}
      px={useBreakpointValue({ base: 4, md: 8 })}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundColor={'#613659'}
    >
      <Stack
        align={'flex-start'}
        spacing={6}
        alignItems={'center'}
        whiteSpace={'pre-line'}
      >
        <Text
          color={'white'}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
        >
          Frequently Asked Question
        </Text>
        <br />

        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="center">
                  <Text fontSize="3xl" color="white">
                    자주묻는 질문을 확인해보세요
                  </Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box justifyContent="center" textAlign="center" h="full">
                <List spacing={6} justifyContent="center" textAlign="left">
                  <ListItem fontSize="2xl" color="white">
                    <ListIcon as={ArrowRightIcon} color="white" />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </ListItem>
                  <ListItem fontSize="2xl" color="white">
                    <ListIcon as={ArrowRightIcon} color="white" />
                    Assumenda, quia temporibus eveniet a libero incidunt
                    suscipit
                  </ListItem>
                  <ListItem fontSize="2xl" color="white">
                    <ListIcon as={ArrowRightIcon} color="white" />
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                  </ListItem>

                  <ListItem fontSize="2xl" color="white">
                    <ListIcon as={ArrowRightIcon} color="white" />
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                  </ListItem>
                </List>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </VStack>
  );
}

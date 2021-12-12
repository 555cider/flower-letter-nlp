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
      <Text
        color={'white'}
        fontWeight={700}
        lineHeight={1.2}
        fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}
        mb="5"
        fontFamily={'EliceBold'}
      >
        Frequently Asked Question
      </Text>
      <Box w="60%">
        <Accordion
          defaultIndex={[0]}
          color="white"
          fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })}
        >
          <Text
            color="white"
            align={'center'}
            fontSize={useBreakpointValue({ base: '2xl', md: '2xl' })}
            mb="3"
            fontFamily={'EliceBold'}
          >
            자주묻는 질문을 확인해보세요
          </Text>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontFamily={'EliceRegular'}
                >
                  배송은 얼마나 걸리나요?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              fontSize={'lg'}
              color="#FBEDE0"
              fontFamily={'EliceRegular'}
            >
              평균적으로 3주 정도 소요되며, 배송이 시작되면 이메일로
              알려드립니다. 주문하신 시집은 커스터마이징된 결과물이기 때문에
              제작에 다소 시간이 걸리는 점 양해해 주세요.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontFamily={'EliceRegular'}
                >
                  주문을 완료했는데 변경이나 취소 가능한가요?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              fontSize={'lg'}
              color="#FBEDE0"
              fontFamily={'EliceRegular'}
            >
              주문을 이미 완료했는데 변경, 취소를 원하시는 경우 주문번호와 함께
              아래에 문의를 남겨주세요. 최대한 빨리 연락드리도록 하겠습니다.
              전화상담 원하시는 경우 전화번호도 함께 기재해주세요.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontFamily={'EliceRegular'}
                >
                  환불 규정에 대해 알고 싶어요.
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              fontSize={'lg'}
              color="#FBEDE0"
              fontFamily={'EliceRegular'}
            >
              시집은 주문제작이기 때문에 환불이 어려운점 양해부탁드립니다.
              주문하시기 전 커스터마이징 한 디자인과 내용을 충분히 검토하신 후에
              결제 부탁드립니다.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontFamily={'EliceRegular'}
                >
                  시집을 배송받는 날짜를 지정할 수 있나요?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              fontSize={'lg'}
              color="#FBEDE0"
              fontFamily={'EliceRegular'}
            >
              네 가능합니다. 주문을 완료해주시고 주문번호와 함께 원하는 날짜를
              문의사항에 남겨주시면, 빨리 답변드리도록 하겠습니다.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontFamily={'EliceRegular'}
                >
                  시집에 몇편의 시가 포함되어 있나요?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              fontSize={'lg'}
              color="#FBEDE0"
              fontFamily={'EliceRegular'}
            >
              시집은 시 100편으로 포함되어 있습니다. 시의 개수를 조절하는 기능이
              추가 될 예정이니 기다려주세요.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </VStack>
  );
}

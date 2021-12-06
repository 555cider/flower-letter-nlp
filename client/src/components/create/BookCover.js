import React from "react";
import StepsLetter from "../StepsLetter";
import EditContainer from "./EditContainer";
import {
  Flex,
  HStack,
  Box,
  Button,
  Spacer,
  useRadioGroup,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function BookCover() {
  const navigate = useNavigate();

  return (
    <div>
      <StepsLetter />
      <HStack h="70vh" p="2" ml="5" mr="5" align="center" justify="center">
        {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
        <Flex w="60%" h="100%" border="1px" borderRadius="10px" mr="1">
          {/* 왼쪽 박스 */}
          디자인 단계
        </Flex>
        <Flex
          w="40%"
          h="100%"
          border="1px"
          borderRadius="10px"
          ml="1"
          justify="center"
          align="center"
        >
          {/* 오른쪽 박스 */}
          <VStack w="100%" h="90%" align="center" border="1px" p="3" m="2">
            <Text>컬러</Text>
            <div className="scrollbox" align="center">
              <Button
                className="flowerbutton"
                m="2"
                w="90%"
                h="60px"
                bg="skyblue"
                fontWeight="600"
                color="white"
              >
                Color
              </Button>
              <Button
                className="flowerbutton"
                m="2"
                w="90%"
                h="60px"
                bg="skyblue"
                fontWeight="600"
                color="white"
              >
                Color
              </Button>
            </div>
            <Text>폰트</Text>
            <div className="scrollbox" align="center">
              <Button
                className="flowerbutton"
                m="2"
                w="90%"
                h="60px"
                bg="skyblue"
                fontWeight="600"
                color="white"
              >
                Font
              </Button>
              <Button
                className="flowerbutton"
                m="2"
                w="90%"
                h="60px"
                bg="skyblue"
                fontWeight="600"
                color="white"
              >
                Font
              </Button>
            </div>
          </VStack>
        </Flex>
      </HStack>

      <Flex pl="6" pr="6" h="10%" w="100%">
        <Box>
          <Button
            w="30vh"
            h="7vh"
            bg="skyblue"
            color="white"
            fontSize="3vh"
            onClick={() => {
              navigate("/create/flowerlang");
            }}
          >
            이전 단계
          </Button>
        </Box>
        <Spacer />
        <Box>
          <Button
            w="30vh"
            h="7vh"
            bg="skyblue"
            color="white"
            fontSize="3vh"
            onClick={() => {
              navigate("/create/freecontent");
            }}
          >
            다음 단계
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

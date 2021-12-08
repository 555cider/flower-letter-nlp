
import React, { useEffect } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import StepsLetter from "./StepsLetter";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import PoemContainer from "./create/PoemContainer";

import { Button, HStack, VStack, Flex, Box, Spacer } from "@chakra-ui/react";


function EditAnthology() {
  const navigate = useNavigate();
  const {flowersList, poems} = useSelector((state)=>({
    flowersList:state.flowersList,
    poems:state.poems
  }))

  //console.log('리덕스로 꽃말 잘 들어왔나 확인',flowersList)
  //console.log('리덕스로 시데이터 잘 들어왔나 확인',poems)

  const { title, content } = useSelector((state) => ({
    title: state.letter_title,
    content: state.letter_content,
  }));

     
  return (
    <div>
      <StepsLetter></StepsLetter>
      <HStack h="70vh" p="2" ml="5" mr="5" align="center" justify="center">
        {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
        <Flex w="60%" h="100%" border="1px" borderRadius="10px" mr="1" p="2">
          {/* 왼쪽 박스 */}
          키워드 선택 단계
        </Flex>
        <VStack
          justify="center"
          w="40%"
          h="100%"
          border="1px"
          borderRadius="10px"
          ml="1"
          p="4"
        >
          {/* 오른쪽 박스 - 키워드 비율 조절 */}
          <HStack
            display="flex"
            m="1"
            p="2"
            mb="0"
            w="100%"
            h="65%"
            align="center"
            border="1px"
          >
            <Box w="100%" border="1px" h="100%" align="center" justify="center">
              <input className="keywordrange" type="range"></input>
            </Box>
            <Box w="100%" border="1px" h="100%">
              <input className="keywordrange" type="range"></input>
            </Box>
            <Box w="100%" border="1px" h="100%">
              <input className="keywordrange" type="range"></input>
            </Box>
            <Box w="100%" border="1px" h="100%">
              <input className="keywordrange" type="range"></input>
            </Box>
          </HStack>
          <HStack
            m="1"
            mt="0"
            p="2"
            w="100%"
            h="12%"
            align="center"
            border="1px"
            fontSize="1.5vw"
          >
            <Box w="25%" border="1px" h="100%" align="center">
              #사랑
            </Box>
            <Box w="25%" border="1px" h="100%" align="center">
              #우정
            </Box>
            <Box w="25%" border="1px" h="100%" align="center">
              #인생
            </Box>
            <Box w="25%" border="1px" h="100%" align="center">
              #가족
            </Box>
          </HStack>
        </VStack>
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
              navigate("/create");
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
              navigate("/create/flowerlang");
            }}
          >
            다음 단계
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

export default EditAnthology;

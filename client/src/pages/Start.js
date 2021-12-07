import React from "react";
import SidebarComponent from "../components/SidebarComponent";
import styled from "styled-components";
import { Container, Button, Text,VStack,Stack, useBreakpointValue,Box, Image, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div style={{height:'100vh',overflow:'auto'}}>
      <SidebarComponent></SidebarComponent>
    
      <VStack w='full' h='full' justify={"center"} px={useBreakpointValue({ base: 4, md: 8 })} backgroundPosition="center" backgroundSize="cover">
        <Stack align={"flex-start"} spacing={6} alignItems={"center"} whiteSpace={"pre-line"}>
          <Text
            color='black'
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}

          >
            지금부터 시집을 생성해보세요
          </Text>
          <Box>
            <Image src='img/lavenderBook.png' boxSize='400px' borderRadius='20px' ></Image>
          </Box>
          <Button onClick={()=>{navigate('/create')}}>편지쓰러가기</Button>
        </Stack>  

        
      </VStack>  
      <VStack w='full' h='full' justify={"center"} px={useBreakpointValue({ base: 4, md: 8 })} backgroundPosition="center" backgroundSize="cover">
        <Stack align={"flex-start"} spacing={6} alignItems={"center"} whiteSpace={"pre-line"}>
          <Box w='700px' h='400px' bg='#E8B4B8' borderRadius='30px'>
            <Text fontSize='3xl' color='white' justifyContent='center' textAlign='center'>Price</Text>

            <Center>*자유글 별도, 추가시 페이지당 300원</Center>
          </Box>
        </Stack>  

        
      </VStack> 

      
      

{/*
      <MainContainer>
        <Text fontSize='4xl' justifyContent='center' textAlign='center'>지금부터 시집을 생성해보세요</Text>
        <LeftContanier>
          <p>
            국회의원은 현행범인인 경우를 제외하고는 회기중 국회의 동의없이 체포
            또는 구금되지 아니한다. 근로조건의 기준은 인간의 존엄성을 보장하도록
            법률로 정한다. 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를
            공고하여야 한다. 대통령은 국무총리·국무위원·행정각부의 장 기타
            법률이 정하는 공사의 직을 겸할 수 없다.
          </p>
          <Button
            textAlign="center"
            justifyContent="center"
            onClick={() => {
              navigate("/create");
            }}
          >
            시집 만들기
          </Button>
        </LeftContanier>
        <RightContainer>
          <Container>오른쪽</Container>
        </RightContainer>
      </MainContainer>
    </>

          */}
  </div>
  );

};

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 20px;
  //border: 1px solid #003458;
`;

const LeftContanier = styled.div`
  width: 70%;
  height: 100vh;
  float: left;
  box-sizing: border-box;
  /* background: #8977ad; */
  background: no-repeat center url("img/lavenderBook.png");
  background-size: cover;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  > p {
    width: 50%;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const RightContainer = styled.div`
  width: 30%;
  height: 100vh;
  float: right;
  box-sizing: border-box;
  background: #ece6cc;
`;

export default Start;

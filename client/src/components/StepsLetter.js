import React from 'react';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CloseButton,
  VStack,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

function StepsLetter() {
  const navigate = useNavigate();

  return (
    <VStack w="100%" h="20vh" pl="7" pr="7">
      <Flex w="100%" h="35%" align="center" pl="6">
        {/* 닫기 버튼 */}
        <CloseButton
          size="2xl"
          onClick={() => {
            navigate('/');
          }}
        ></CloseButton>
      </Flex>
      <Flex
        bg="#D4BBDD"
        fontWeight="600"
        color="white"
        w="100%"
        h="65%"
        align="center"
        justify="center"
        borderRadius="20px"
      >
        {/* 단계 박스 */}
        <Breadcrumb
          fontSize="2vw"
          spacing="17"
          separator={<ChevronRightIcon color="white" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                navigate('/create');
              }}
            >
              <NavLink exact end to="/create">
                편지쓰기
              </NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                navigate('/create/keyword');
              }}
            >
              <NavLink exact to="/create/keyword">
                키워드 선택
              </NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              onClick={() => {
                navigate('/create/flowerlang');
              }}
            >
              <NavLink exact to="/create/flowerlang">
                꽃말 선택
              </NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              onClick={() => {
                navigate('/create/bookcover');
              }}
            >
              <NavLink exact to="/create/bookcover">
                디자인
              </NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              onClick={() => {
                navigate('/create/freecontent');
              }}
            >
              <NavLink exact to="/create/freecontent">
                자유 글쓰기
              </NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              onClick={() => {
                navigate('/create/final');
              }}
            >
              <NavLink exact to="/create/final">
                시집검토
              </NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
    </VStack>
  );
}

export default StepsLetter;

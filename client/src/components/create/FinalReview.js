import React, { useState } from 'react';
import StepsLetter from '../StepsLetter';
import { Flex, HStack, Box, Button, Spacer, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PoemContainer from './PoemContainer';
import Preview from '../Preview';

export default function FinalReview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { poems, free_content, font, title } = useSelector((state) => ({
    poems: state.poems,
    free_content: state.free_content,
    font: state.userfont,
    title: state.title,
  }));

  const [poem, setPoem] = useState('');
  const [finalTitle, setFinalTitle] = useState(title);

  const poemsTitleList = poems.map((content, index) => (
    <Button
      key={index}
      m="2"
      w="90%"
      h="60px"
      bg="skyblue"
      fontWeight="600"
      color="white"
      onClick={() => {
        setPoem(content['content']);
      }}
    >
      {content['title']}
    </Button>
  ));
  //console.log('poem', poem);
  //console.log('유저가 선택한 폰트', font);
  //console.log('시집 제목', title);

  const handleChange = (e) => {
    setFinalTitle(e.target.value);
  };

  return (
    <div>
      <StepsLetter />
      <HStack h="70vh" p="2" ml="5" mr="5" align="center" justify="center">
        {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
        <Flex w="60%" h="100%" border="1px" borderRadius="10px" mr="1">
          {/* 왼쪽 박스 */}
          {poem}
          <Preview />
        </Flex>
        <Flex w="40%" h="100%" border="1px" borderRadius="10px" ml="1">
          {/* 오른쪽 박스 */}
          <div className="scrollbox" align="center">
            {/* 스크롤 박스. 스크롤 표시되도록 복붙으로 버튼 넣은 상태 */}
            <Input
              placeholder="시집 제목을 입력하세요"
              onChange={handleChange}
            />
            <Button
              onClick={() => {
                dispatch({ type: 'SAVE_TITLE', finalTitle });
              }}
            >
              저장
            </Button>
            {poemsTitleList}
            <Button
              m="2"
              w="90%"
              h="60px"
              bg="skyblue"
              fontWeight="600"
              color="white"
              onClick={() => {
                setPoem(free_content);
              }}
            >
              자유글
            </Button>
          </div>
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
              navigate('/create/freecontent');
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
              navigate('/orders');
            }}
          >
            다음 단계
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

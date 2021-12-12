import React, { useState } from 'react';
import StepsLetter from '../StepsLetter';
import {
  Flex,
  HStack,
  Box,
  Button,
  Spacer,
  Input,
  Text,
  Container,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PoemContainer from './PoemContainer';
import Preview from '../Preview';
import CreatePageEx from '../CreatePageEx';

export default function FinalReview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    poems,
    free_content,
    font,
    title,
    letter_content,
    user_flower_id,
    color,

    user_flower_symbol,
  } = useSelector((state) => ({
    poems: state.poems,
    free_content: state.free_content,
    font: state.userfont,
    color: state.usercolor,
    title: state.title,
    letter_content: state.letter_content,
    user_flower_id: state.user_flower_id,
    user_flower_symbol: state.user_flower_symbol,
  }));

  const [mainContent, setMainContent] = useState('');
  const [poemTitle, setPoemTitle] = useState('');
  const [author, setAuthor] = useState('');

  const [finalTitle, setFinalTitle] = useState(title);

  const letter = [
    { title: '내가 작성한 편지', content: letter_content },
    { title: '꽃말', content: user_flower_symbol },
  ];

  const contentsList = letter.concat(poems);

  const poemsTitleList = contentsList.map((content, index) => (
    <Button
      key={index}
      m="2"
      w="90%"
      h="60px"
      bg="skyblue"
      fontWeight="600"
      color="white"
      onClick={() => {
        setMainContent(content['content']);

        if (content.author !== undefined) {
          setPoemTitle(content['title']);
          setAuthor(content['author']);
        } else {
          setPoemTitle('');
          setAuthor('');
        }
        setCoverButton(false);
      }}
    >
      {content['title']}
    </Button>
  ));

  const handleChange = (e) => {
    setFinalTitle(e.target.value);
    dispatch({ type: 'SAVE_TITLE', finalTitle });
  };

  const [coverButton, setCoverButton] = useState(true);

  let isFree = false;
  if (free_content !== '') {
    isFree = true;
  }

  return (
    <div>
      <VStack h="100vh" bgGradient={'radial(white, #FDF5E6, #FBEBCD, #FBEED4)'}>
        <StepsLetter />
        <CreatePageEx exText={'tjfaud ansrnasdfaweoifj'}></CreatePageEx>

        <HStack
          h="80vh"
          w="100%"
          p="2"
          ml="5"
          mr="5"
          align="center"
          justify="center"
        >
          {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
          <Flex
            w="47%"
            h="100%"
            borderRadius="10px"
            mr="1"
            p="2"
            align={'center'}
            justify="center"
          >
            {/* 왼쪽 박스 */}

            {coverButton && <Preview userfont={font} usercolor={color} />}
            {!coverButton && (
              <PoemContainer
                poem_content={mainContent}
                poem_author={author}
                poem_title={poemTitle}
              />
            )}
          </Flex>
          <Flex
            w="27%"
            h="100%"
            borderRadius="10px"
            ml="1"
            p="4"
            justify="center"
            align="center"
          >
            {/* 오른쪽 박스 */}
            <div className="scrollbox" align="center">
              {/* 스크롤 박스. 스크롤 표시되도록 복붙으로 버튼 넣은 상태 */}
              <Input
                placeholder="시집 제목을 입력하세요"
                onChange={handleChange}
              />
              <Button
                m="2"
                w="90%"
                h="60px"
                bg="skyblue"
                fontWeight="600"
                color="white"
                onClick={() => {
                  setCoverButton(true);
                }}
              >
                표지
              </Button>

              {poemsTitleList}
              {isFree && (
                <Button
                  m="2"
                  w="90%"
                  h="60px"
                  bg="skyblue"
                  fontWeight="600"
                  color="white"
                  onClick={() => {
                    setMainContent(free_content[0]);
                    setAuthor('');
                    setPoemTitle('');
                    setCoverButton(false);
                  }}
                >
                  자유글
                </Button>
              )}
            </div>
          </Flex>
        </HStack>
        <Flex pl="6" pr="6" h="10%" w="100%">
          <Box>
            <Button
              borderRadius={'15px'}
              w="25vh"
              h="7vh"
              fontFamily={'EliceBold'}
              _hover={{ bg: '#D4BBDD', color: 'white' }}
              bg="white"
              borderColor="#D4BBDD"
              border="2px"
              color="#D4BBDD"
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
              borderRadius={'15px'}
              w="25vh"
              h="7vh"
              fontFamily={'EliceBold'}
              _hover={{ bg: '#D4BBDD', color: 'white' }}
              bg="white"
              borderColor="#D4BBDD"
              border="2px"
              color="#D4BBDD"
              fontSize="3vh"
              onClick={() => {
                navigate('/orders');
              }}
            >
              다음 단계
            </Button>
          </Box>
        </Flex>
      </VStack>
    </div>
  );
}

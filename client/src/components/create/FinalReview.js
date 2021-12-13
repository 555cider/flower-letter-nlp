import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';

const ReviewContainer = styled.div`
  display: flex;
  width: 70vw;
  gap: 222px;
  min-height: 420px;
  height: 80vh;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Sungsil';
  font-size: 1.2rem;
  .leftBox {
    display: flex;
    justify-content: center;
  }
  .rightBox {
    width: 330px;
    min-height: 420px;
    height: 55vh;
    overflow: auto;
    padding: 40px;
    padding-top: 20px;
    border: 10px solid #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    box-shadow: 1px 1px 1px rgba(120, 120, 120, 0.2);
    .buttons {
      cursor: pointer;
      background-color: #d8bfd7;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 5px;
    }
    .input-field {
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #efefef;
    }
    .right-box-content {
      box-shadow: 1px 1px 1px rgba(120, 120, 120, 0.2);
    }
    .cover {
      background-color: #fbe2ad;
    }
  }
`;

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
    <div
      key={index}
      className="buttons right-box-content"
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
    </div>
  ));

  const handleChange = (e) => {
    setFinalTitle(e.target.value);
    dispatch({ type: 'SAVE_TITLE', finalTitle });
  };

  console.log('자유글', free_content);

  const [coverButton, setCoverButton] = useState(true);

  const [isFree, setIsFree] = useState(false);

  console.log('자유글 길이', free_content.length);

  useEffect(() => {
    if (free_content.length !== 0) {
      setIsFree(true);
    }
  }, []);
  return (
    <div>
      <VStack h="100vh" bgGradient={'radial(white, #FDF5E6, #FBEBCD, #FBEED4)'}>
        <StepsLetter />
        <CreatePageEx
          exText={'마지막으로 시집의 제목과 목차를 검토해 주세요!'}
        ></CreatePageEx>

        <ReviewContainer>
          {/* 왼쪽, 오른쪽 박스를 묶는 박스 */}
          <div className="leftBox">
            {/* 왼쪽 박스 */}

            {coverButton && <Preview userfont={font} usercolor={color} />}
            {!coverButton && (
              <PoemContainer
                poem_content={mainContent}
                poem_author={author}
                poem_title={poemTitle}
              />
            )}
          </div>
          <div className="rightBox">
            {/* 오른쪽 박스 */}
            {/* 스크롤 박스. 스크롤 표시되도록 복붙으로 버튼 넣은 상태 */}
            <input
              className="input-field right-box-content"
              placeholder="시집 제목을 입력하세요"
              onKeyUp={handleChange}
            />
            <div
              className="buttons right-box-content cover"
              onClick={() => {
                setCoverButton(true);
              }}
            >
              표지
            </div>

            {poemsTitleList}
            {isFree && (
              <div
                className="buttons right-box-content free"
                onClick={() => {
                  setMainContent(free_content[0]);
                  setPoemTitle('');
                  setAuthor('');
                  setCoverButton(false);
                }}
              >
                자유글
              </div>
            )}
          </div>
        </ReviewContainer>
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

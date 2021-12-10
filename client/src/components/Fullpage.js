import React, { useRef, useEffect } from 'react';

import { Button, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import WithBackgroundImage from './WithBackgroundImage';
import LeftImage from './LeftImage';
import ReviewComponent from './ReviewComponent';
import RightImage from './RightImage';
import WritingAnima from './WritingAnima';

const DIVIDER_HEIGHT = 5;

function Fullpage() {
  const outerDivRef = useRef();
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      {/* 첫번째 스크롤 */}
      <WithBackgroundImage
        //buttonName={"About us"}
        text={'세상에 단 하나 밖에 없는 특별한 시집을 선물해보세요.'}
        textcolor={'white'}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
        isbutton={true}
        buttonName={'시집 만들러 가기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/start'}
        // buttonBorder={'2px'}
        // buttonBorderColor={'#A49393'}
        buttonTextColor={'#A49393'}
      />
      {/* 두번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageFirstImg.png'}
        text={'편지에 마음을 담아서, 마음의 편지.'}
        textColor="white"
        bgGradient={'linear(to-b, #D4BBDD, #FFE6A8)'}
      />
      {/* 세번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageFirstImg.png'}
        text={'시의 각 단계별 커스터마이징 기능이 매우 좋다는 의미, '}
        textColor="white"
        backgroundcolor={'#FFE6A8'}
      />
      {/* 네번째 스크롤 */}
      <WithBackgroundImage
        //buttonName={"About us"}
        text={'편지 분석으로 나만의 맞춤 시집 생성? 어떻게 할 수 있나요?'}
        textcolor={'white'}
        background={''}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
        isbutton={true}
        buttonName={'시집 만드는 방법'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/howtouse'}
        // buttonBorder={'2px'}
        // buttonBorderColor={'#A49393'}
        buttonTextColor={'#A49393'}
      />
      {/* 다섯번째 스크롤 */}
      <WritingAnima
        h={'100%'}
        textcolor={'#613659'}
        backgroundImg={'/img/letterpaper.png'}
        isbutton={true}
        buttonName={'편지 쓰러 가기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/start'}
        // buttonBorder={'2px'}
        // buttonBorderColor={'#A49393'}
        buttonTextColor={'#A49393'}
        backgroundcolor={'#D4BBDD'}
      />
      {/* 유저리뷰 스크롤 */}
      <ReviewComponent bgGradient={'linear(to-b, #D4BBDD, #613659)'} />
      {/* 여섯번째 스크롤 */}
      <WithBackgroundImage
        text={'더 궁금한 사항이 있으신가요?'}
        textcolor={'white'}
        isbutton={true}
        buttonName={'문의하기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/question'}
        // buttonBorder={'2px'}
        // buttonBorderColor={'#A49393'}
        buttonTextColor={'#A49393'}
        backgroundcolor={'#613659'}
      />
    </div>
  );
}

export default Fullpage;

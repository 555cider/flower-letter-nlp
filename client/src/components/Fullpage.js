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
    <div style={{ height: '100vh' }}>
      {/* 첫번째 스크롤 */}
      <WithBackgroundImage
        //buttonName={"About us"}

        text={'편지를 쓰면, 시집이 됩니다.'}
        contentText={`꽃편지는 세상에서 단 하나뿐인, 그사람만을 위한 시집을 만들어주는 서비스입니다. 
        누군가에게 마음을 전하기 위해 편지를 써보세요. 
        꽃편지의 AI는 당신의 편지 내용을 분석해서, 그 사람만을 위한 시집을 선물할 수 있도록 해줍니다.`}
        textcolor={'white'}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
        isbutton={true}
        buttonName={'더 알아보기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/about'}
        buttonTextColor={'#A49393'}
        hoverset={{ color: '#FBEDE0', bg: '#A49393' }}
      />
      {/* 두번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/landing_sunflower.jpg'}
        text={`'당신만을 바라봅니다.'`}
        text2={` - 해바라기 꽃말 -`}
        contentText={`AI가 추천해주는 의미있는 꽃말 중에서 마음에 드는 것을 선택해 표지를 꾸며보세요.

        폰트, 커버색상도 직접 골라, 맞춤 디자인 시집을 만들 수 있습니다. 
        
        자유글 추가 기능을 이용해 직접 쓴 시도 추가해, 특별한 커스텀 시집을 완성해보세요.`}
        textColor="white"
        bgGradient={'linear(to-b, #D4BBDD, #FFE6A8)'}
      />
      {/* 세번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageFirstImg.png'}
        text={'실시간 미리보기 & 검토'}
        text2={`단계별로 시집을 커스터마이징 해보세요`}
        contentText={`각 단계별로 실시간 미리보기를 통해 시집의 디자인을 확인할 수 있습니다.

        당신이 선택한 옵션으로 시집이 완성되어 가는 것을 확인해 보세요.
        
        페이지 미리보기를 통해 시집의 목차를 검토 해 보세요.`}
        textColor="white"
        backgroundcolor={'#FFE6A8'}
      />
      {/* 네번째 스크롤 */}
      <WritingAnima
        h={'100%'}
        textcolor={'#613659'}
        backgroundImg={'/img/letterpaper.png'}
        isbutton={true}
        buttonName={'바로 시작하기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/start'}
        buttonTextColor={'#A49393'}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
        hoverset={{ color: '#FBEDE0', bg: '#A49393' }}
      />
      {/* 다섯번째 스크롤 */}
      <ReviewComponent backgroundcolor={'#D4BBDD'} />

      {/* 여섯번째 스크롤 */}

      <WithBackgroundImage
        text={'더 궁금하신 사항이 있으신가요?'}
        contentText={`자주 묻는 질문을 확인해보세요.`}
        textcolor={'white'}
        isbutton={true}
        buttonName={'자주 묻는 질문'}
        buttonColor={'white'}
        buttonUrl={'/question'}
        buttonBorder={'2px'}
        buttonBorderColor={'#D4BBDD'}
        buttonTextColor={'#D4BBDD'}
        bgGradient={'linear(to-b, #D4BBDD, #613659)'}
        hoverset={{ color: 'white', bg: '#D4BBDD' }}
      />
    </div>
  );
}

export default Fullpage;

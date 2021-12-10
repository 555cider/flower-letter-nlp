import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import WithBackgroundImage from '../components/WithBackgroundImage';
import LeftImage from '../components/LeftImage';
import RightImage from '../components/RightImage';

export default function HowToUse() {
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <SidebarComponent />
      {/* 첫번째 스크롤 - 이미지로 넣기 */}
      <WithBackgroundImage text={'How To Use'} textcolor={'black'} />
      {/* 두번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageThirdImg.png'}
        text={'Step1. 편지를 작성해보세요'}
        backgroundcolor={'#F7EBE9'}
      />
      {/* 세번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/mainPageFirstImg.png'}
        text={'Step2. 꽃말을 선택하세요'}
        bgGradient={'linear(to-b, #F7EBE9, #C9B5B3)'}
      />
      {/* 네번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageThirdImg.png'}
        text={'Step03. 선택된 시집을 통해 나만의 시집을 만들어보세요'}
        bgGradient={'linear(to-b, #C9B5B3, #A49393)'}
      />
      {/* 다섯번째 스크롤 */}
      <WithBackgroundImage
        backgroundcolor={'#A49393'}
        text={'지금 바로 시작해보세요'}
        isbutton={true}
        buttonName={'시집 만들기'}
        buttonUrl={'/start'}
      />
    </div>
  );
}

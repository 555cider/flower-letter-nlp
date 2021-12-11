import React from 'react';
import LeftImage from '../components/LeftImage';
import SidebarComponent from '../components/SidebarComponent';
import WithBackgroundImage from '../components/WithBackgroundImage';
import RightImage from '../components/RightImage';

const About = () => {
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <SidebarComponent></SidebarComponent>
      {/* 첫번째 스크롤 */}
      <WithBackgroundImage
        text={'꽃 편지 About us 내용들'}
        textcolor={'black'}
        bgGradient={'linear(to-b, #D4BBDD, #FFE6A8)'}
      />
      {/* 두번째 스크롤 */}
      <WithBackgroundImage
        h={'700px'}
        text={
          '대통령의 선거에 관한 사항은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체...'
        }
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
      />
      {/* 세번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        bgGradient={'linear(to-t, #FFE6A8, #D4BBDD)'}
        text={
          '대통령의 선거에 관한 사항은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체...'
        }
        backgroundImg={'/img/backgroundImg2_fall.png'}
      />
      {/* 네번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        text={'늘 당신과 함께하고 싶습니다'}
        backgroundcolor={'#FFE6A8'}
      />
      {/* 다섯번째 스크롤 */}
      <WithBackgroundImage
        text={'더 궁금한 사항을 물으러 가라는 뜻'}
        bgGradient={'linear(to-t, #D4BBDD, #FFE6A8)'}
        isbutton={true}
        buttonName={'/question으로'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/question'}
        // buttonBorder={'2px'}
        // buttonBorderColor={'#A49393'}
        buttonTextColor={'#A49393'}
        backgroundcolor={'#613659'}
      />
    </div>
  );
};

export default About;

import React from 'react';
import LeftImage from '../components/LeftImage';
import SidebarComponent from '../components/SidebarComponent';
import WithBackgroundImage from '../components/WithBackgroundImage';
import RightImage from '../components/RightImage';
import styled from 'styled-components';

const AboutUsMain = styled.div`
  width: 100vw;
  height: 120vh;
  position: relative;
  z-index: -1;
  .banner-foreground {
    position: absolute;
    width: 100vw;
    height: 40vh;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .about-us-title {
    background-color: #fff;
    width: 100vw;
    height: 40vh;
    padding: 80px;
    position: relative;
    z-index: -1;
    display: flex;
    justify-content: center;
    background-image: url('img/about-banner.jpeg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .logo {
      position: absolute;
      bottom: 120px;
      width: 140px;
    }
    .title-text {
      color: #000;
      font-size: 5rem;
      font-weight: bold;
      position: absolute;
      bottom: 30px;
      font-family: 'NanumMom';
    }
  }
  .about-us-introduce {
    /* background-color: #fee5a7; */
    background-color: #fff;
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    color: #000;
    justify-content: center;
    align-items: center;
    gap: 35px;
    .introduce-title {
      font-size: 2.5rem;
      font-family: 'Sungsil';
      text-align: center;
    }
    .introduce-content {
      font-size: 1.5rem;
      font-family: 'Sungsil';
      text-align: center;
      color: #777;
      line-height: 2;
    }
  }
`;

const About = () => {
  return (
    <div style={{ height: '100vh' }}>
      <SidebarComponent />
      {/* 첫번째 스크롤 */}
      {/* <WithBackgroundImage
        text={'한 편의 시는 때로 백마디 말보다 위로가 됩니다. '}
        contentText={`우린 특별한 사람에게 줄 선물로 시집을 고르고는 합니다. 
        하지만 시의 종류는 너무도 많고 다양해, 누군가에게 줄 선물로 맞는 시집을 고르기란 쉬운 일이 아니죠.
        그래서 유명한 시인의 시집을 사거나, 누군가가 엮어놓은 시집을 검색하고는 합니다. 
        꽃편지는 당신이 특별한 사람을 위해, 가장 특별한 맞춤 시집을 선물할 수 있게 도와줍니다.
        `}
        contentfont={'Sungsil'}
        textcolor={'#613659'}
        bgGradient={'linear(to-b, #D4BBDD, #FFE6A8)'}
      /> */}
      <AboutUsMain>
        <div className="banner-foreground"></div>
        <div className="about-us-title">
          <img
            className="logo"
            src="img/logoimg.png"
            alt="logo"
            borderRadius="15px"
          />
          <div className="title-text">{`About Us`}</div>
          <div className="underline"></div>
        </div>
        <div className="about-us-introduce">
          <div className="introduce-title">
            {'한 편의 시는 때로 백마디 말보다 위로가 됩니다. '}
          </div>
          <div className="introduce-content">
            우린 특별한 사람에게 줄 선물로 시집을 고르고는 합니다. <br />
            하지만 시의 종류는 너무도 많고 다양해,
            <br /> 누군가에게 줄 선물로 맞는 시집을 고르기란 쉬운 일이 아니죠.{' '}
            <br />
            그래서 유명한 시인의 시집을 사거나, 누군가가 엮어놓은 시집을
            검색하고는 합니다. <br />
            꽃편지는 당신이 특별한 사람을 위해, 가장 특별한 맞춤 시집을 선물할
            수 있게 도와줍니다.
          </div>
        </div>
      </AboutUsMain>
      {/* 두번째 스크롤 */}
      <RightImage
        h="full"
        w="full"
        text={'How it works'}
        // textcolor={'#613659'}
        imgUrl={'img/about-howitworks.jpeg'}
        textcolor={'#000'}
        textfont={'NanumMom'}
        textsize={'5rem'}
        contentfont={'Sungsil'}
        contentText={`누군가에게 편지를 써보세요. 꽃편지의 AI가 당신의 편지 내용을 분석해 시집을 엮어줍니다. 
        삶의 혼란스러운 시기를 겪고 있는 딸에게, 또는 결혼을 약속한 연인에게 편지를 써보세요.
         그 사람에게 마음을 전하고, 힘과 위로가 되어줄 수 있는 시들로 이루어진 시집을 꽃편지가 만들어 드립니다. 
         또한 AI가 추천하는 맞춤 꽃말 중에서 하나를 선택해, 당신만의 의미가 더해진 시집을 완성할 수 있습니다.`}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
      />
      {/* 세번째 스크롤 */}
      <LeftImage
        w="full"
        h="full"
        // h="700px"
        // bgGradient={'linear(to-t, #FFE6A8, #D4BBDD)'}
        text={`꽃편지의 AI`}
        text2={`마음을 전하기 위해 우린 편지를 씁니다.`}
        imgUrl={'img/about-letter.jpeg'}
        contentText={`그리고 편지의 대상과 그 안에 담긴 내용은 너무나도 다양하죠. 꽃편지의 인공지능 기술은 이런 다양한 편지들을 구별하고, 상대와 내용에 맞는 맞춤 키워드를 알려줍니다. 그렇게 편지의 키워드를 알맞은 시들과 매칭을 시켜주어 상대에 꼭 맞는 선물용 시집을 엮어주게 됩니다.`}
        // backgroundImg={'/img/backgroundImg2_fall.png'}
        backgroundcolor={'#fff'}
      />
      {/* 네번째 스크롤 */}
      <WithBackgroundImage
        w="full"
        // h="700px"
        h="full"
        // text={`꽃편지의 AI`}
        bgGradient={'linear(to-t, #FFE6A8, #D4BBDD)'}
        text2={``}
        // imgUrl={'img/about-poetry.jpeg'}
        contentText={`소중한 사람에게 당신의 마음을 전하고, 응원과 위로가 되어주는 시집을 선물해보세요. 
        이 세상 단 하나뿐인 특별한 시집을 선물받는, 
        아주 특별한 추억이 되어줄 것입니다.`}
        contentTextSize={'2rem'}
        // backgroundcolor={'#FFE6A8'}
      />
      {/* 다섯번째 스크롤 */}
      <WithBackgroundImage
        text={'꽃 편지의 사용법 알아보기'}
        textsize={'4rem'}
        textFontWeight={'100'}
        // bgGradient={'linear(to-t, #D4BBDD, #FFE6A8)'}
        isbutton={true}
        buttonName={'How to Use'}
        // buttonColor={'#FBEDE0'}
        buttonColor={'#FFE6A8'}
        buttonUrl={'/howtouse'}
        // buttonBorder={'2px'}
        // buttonBorderColor={'#A49393'}
        // buttonTextColor={'#A49393'}
        buttonFontWeight={'300'}
        buttonTextColor={'#000'}
        buttonFont={'NanumMom'}
        buttonFontSize={'3.2rem'}
        // backgroundcolor={'#613659'}
        backgroundcolor={'#fff'}
        hoverset={{ boxShadow: '2px 2px 2px #aaa', paddingBottom: '12px' }}
      />
    </div>
  );
};

export default About;

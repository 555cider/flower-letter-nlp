import React from 'react';
import LeftImage from '../components/LeftImage';
import SidebarComponent from '../components/SidebarComponent';
import WithBackgroundImage from '../components/WithBackgroundImage';
import RightImage from '../components/RightImage';

const About = () => {
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <SidebarComponent></SidebarComponent>
      <WithBackgroundImage text={'꽃 편지 About us'} textcolor={'black'} />
      <WithBackgroundImage
        h={'700px'}
        text={
          '대통령의 선거에 관한 사항은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체...'
        }
      />
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainPageFirstImg.png'}
        text={
          '대통령의 선거에 관한 사항은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체...'
        }
        backgroundImg={'/img/backgroundImg2_fall.png'}
      />

      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/mainPageFirstImg.png'}
        text={'늘 당신과 함께하고 싶습니다'}
        backgroundcolor={'#FBEDE0'}
      />
      <WithBackgroundImage
        text={
          '대통령의 선거에 관한 사항은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체...'
        }
      />
    </div>
  );
};

export default About;

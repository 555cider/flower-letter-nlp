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
      <WithBackgroundImage
        text={'꽃편지의 사용법을 알아보세요'}
        textcolor={'black'}
        backgroundImg={''}
      />
      {/* 두번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageThirdImg.png'}
        textColor={'gray'}
        text={`하나. 편지를 쓰세요.`}
        contentText={`시집을 선물하고자 하는 사람에게 편지를 써보세요. 
        당신이 쓴 편지는 시집의 첫머리를 장식하게 됩니다.`}
        backgroundcolor={'#F7EBE9'}
      />
      {/* 세번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageFirstImg.png'}
        text={`둘. 키워드를 확인해보세요.`}
        contentText={`편지의 내용을 분석한 키워드를 확인해보세요.
        AI가 추천해준 키워드로 매칭된 시집을 받게 됩니다.`}
        textColor={'white'}
        bgGradient={'linear(to-b, #F7EBE9, #C9B5B3)'}
      />
      {/* 네번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageThirdImg.png'}
        text={`셋. 꽃말을 선택하세요.`}
        contentText={`편지 내용에 맞는 꽃말을 선택해보세요.
        선택해주신 꽃말이 시집의 표지 디자인으로 들어가게 됩니다.`}
        textColor={'white'}
        bgGradient={'linear(to-b, #C9B5B3, #A49393)'}
      />
      {/* 다섯번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageFirstImg.png'}
        text={`넷. 디자인을 선택하세요.`}
        contentText={`블랙, 화이트, 베이지 중에서 원하는 느낌의 컬러를 선택해보세요.
        폰트도 설정하고, 실시간 미리보기를 이용해 디자인을 확인해보세요.`}
        textColor={'white'}
        bgGradient={'linear(to-t, #C9B5B3, #A49393)'}
      />
      {/* 여섯번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageThirdImg.png'}
        text={`다섯. 자유글을 추가해보세요.`}
        contentText={`자유글을 이용해 페이지를 원하는 글로 채워보세요. 그사람만을 위한 시인이 되어, 직접 쓴시를 추가해보는 것은 어떨까요?
        (자유글은 선택사항이며, 페이지당 추가 비용이 발생합니다.)`}
        textColor={'white'}
        bgGradient={'linear(to-t, #F7EBE9, #C9B5B3)'}
      />
      {/* 일곱번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/mainpageFirstImg.png'}
        text={`여섯. 시집을 검토해보세요.`}
        contentText={`시집의 제목을 정해보세요. 
        또한 시집의 목차를 클릭해서 각 페이지로 이동할 수 있습니다.`}
        textColor={'gray'}
        backgroundcolor={'#F7EBE9'}
      />
      {/* 여덟번째 스크롤 */}
      <WithBackgroundImage
        backgroundcolor={'#A49393'}
        text={'지금 바로 시작해보세요'}
        textcolor={'white'}
        isbutton={true}
        buttonName={'시집 만들기'}
        buttonUrl={'/start'}
        hoverset={{ color: '#A49393', bg: '#FBEDE0' }}
      />
    </div>
  );
}

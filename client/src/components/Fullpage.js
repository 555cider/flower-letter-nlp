import React, { useRef, useEffect } from 'react';

import { Button, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import WithBackgroundImage from './WithBackgroundImage';
import LeftImage from './LeftImage';
import ReviewComponent from './ReviewComponent';
import RightImage from './RightImage';

const DIVIDER_HEIGHT = 5;

function Fullpage() {
  const outerDivRef = useRef();
  const navigate = useNavigate();

  /*
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        //현재 1페이지면
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
        //현재 2페이지면
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          //현재 3페이지면
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        //스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        //현재 2페이지
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          //현재 3페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerDiveRefCurrent = outerDivRef.current;
    outerDiveRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDiveRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  */

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      {/* 첫번째 스크롤 */}
      <WithBackgroundImage
        //buttonName={"About us"}
        text={'당신의 소중한 사람에게 가장 특별한 시집을 선물해보세요'}
        textcolor={'black'}
        background={''}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
      />
      {/* 두번째 스크롤 */}
      <RightImage
        w="full"
        h="700px"
        imgUrl={'/img/mainPageFirstImg.png'}
        text={'늘 당신과 함께하고 싶습니다'}
        bgGradient={'linear(to-b, #D4BBDD, #FFE6A8)'}
      />

      {/* 세번째 스크롤 */}
      <LeftImage
        w="full"
        h="700px"
        imgUrl={'/img/mainPageFirstImg.png'}
        text={'시의 각 단계별 커스터마이징 기능'}
        backgroundcolor={'#FFE6A8'}
      />
      {/* 네번째 스크롤 */}
      <WithBackgroundImage
        //buttonName={"About us"}
        text={'당신의 소중한 사람에게 가장 특별한 시집을 선물해보세요'}
        textcolor={'black'}
        background={''}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
      />
      {/* 다섯번째 스크롤 */}
      <WithBackgroundImage
        h="1400px"
        text={'수아야 안녕? 나와 늘 함께해줘서 고마워'}
        textcolor={'#613659'}
        isbutton={true}
        buttonName={'바로 시작하기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/start'}
        bgGradient={'linear(to-b, #D4BBDD, #FFE6A8)'}
      />
      {/* 여섯번째 스크롤 */}
      <WithBackgroundImage
        text={'더 궁금한 사항이 있으신가요?'}
        isbutton={true}
        buttonName={'바로가기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/question'}
        bgGradient={'linear(to-b, #FFE6A8, #D4BBDD)'}
      />
      {/* 일곱번째 스크롤 */}
      <WithBackgroundImage
        text={'더 궁금한 사항이 있으신가요?'}
        isbutton={true}
        buttonName={'바로가기'}
        buttonColor={'#FBEDE0'}
        buttonUrl={'/question'}
        bgGradient={'linear(to-b, #D4BBDD, #613659)'}
      />
      <ReviewComponent backgroundcolor={'#613659'} />
    </div>
  );
}

export default Fullpage;

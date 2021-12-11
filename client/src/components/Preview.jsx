import React, { useState } from 'react';
import styled from 'styled-components';
import PreviewImageUrls from './PreviewImageUrls';
import { useSelector } from 'react-redux';

const PreviewFrame = styled.div`
  width: 300px;
  position: relative;

  .cover {
    width: 300px;
    position: relative;
  }
  .flower {
    position: absolute;
    height: 240px;
    left: 40px;
    bottom: 30px;
  }
  .label {
    position: absolute;
    width: 300px;
    left: 0;
    bottom: 0;
  }
  .title {
    position: absolute;
    top: 80px;
    right: 30px;
    font-family: ${(props) => props.font};
    font-size: 1.8rem;
    color: ${(props) => props.textColor};
  }
`;

function Preview() {
  // 사용자 선택, 폰트 불러오기
  const { font, color, title } = useSelector((state) => ({
    font: state.userfont,
    color: state.usercolor,
    title: state.title,
  }));

  const colors = 'black';

  //여기부터
  const text = '너에게 쓰는 편지';
  const currentCover = PreviewImageUrls.covers[color];

  //setCurrentCover(`PrevieImageUrls.covers.${color}`);

  const flowers = PreviewImageUrls.flowers;
  const currentFont = font;
  //여기까지 리덕스로 관리
  return (
    <PreviewFrame textColor={currentCover.textColor} font={currentFont}>
      <img className="cover" src={currentCover.cover} />
      <img className="flower" src={flowers.rose} />
      <img className="label" src={currentCover.label} />
      <div className="title">{title}</div>
    </PreviewFrame>
  );
}

export default Preview;

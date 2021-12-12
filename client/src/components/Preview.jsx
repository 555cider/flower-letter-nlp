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

function Preview({ userfont, usercolor }) {
  // 사용자 선택, 폰트 불러오기
  const { title } = useSelector((state) => ({
    title: state.title,
  }));

  // useState 이용해서 해보기
  const currentCover = PreviewImageUrls.covers[usercolor];
  const flowers = PreviewImageUrls.flowers;

  return (
    <PreviewFrame textColor={currentCover.textColor} font={userfont}>
      <img className="cover" src={currentCover.cover} />
      <img className="flower" src={flowers.rose} />
      <img className="label" src={currentCover.label} />
      <div className="title">{title}</div>
    </PreviewFrame>
  );
}

export default Preview;

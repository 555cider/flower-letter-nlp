import React, { useState } from 'react';
import styled from 'styled-components';
import PreviewImageUrls from './PreviewImageUrls';
import { useSelector } from 'react-redux';

const FinalPreviewFrame = styled.div`
  left: 60px;
  width: 140px;
  position: relative;
  .cover {
    width: 150px;
    position: relative;
  }
  .flower {
    position: absolute;
    height: 120px;
    left: 20px;
    bottom: 15px;
  }
  .label {
    position: absolute;
    width: 150px;
    left: 0;
    bottom: 0;
  }
  .title {
    position: absolute;
    top: 40px;
    right: 15px;
    font-family: ${(props) => props.font};
    font-size: 1.8rem;
    color: ${(props) => props.textColor};
  }
`;

function FinalPreview({ userfont, usercolor }) {
  // 사용자 선택, 폰트 불러오기
  const { title } = useSelector((state) => ({
    title: state.title,
  }));

  // useState 이용해서 해보기
  const currentCover = PreviewImageUrls.covers[usercolor];
  const flowers = PreviewImageUrls.flowers;

  return (
    <FinalPreviewFrame textColor={currentCover.textColor} font={userfont}>
      <img className="cover" src={currentCover.cover} />
      <img className="flower" src={flowers.rose} />
      <img className="label" src={currentCover.label} />
      <div className="title">{title}</div>
    </FinalPreviewFrame>
  );
}

export default FinalPreview;

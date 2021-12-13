import React from 'react';
import styled from 'styled-components';
import PreviewImageUrls from './PreviewImageUrls';
import { useSelector } from 'react-redux';

const FinalPreviewFrame = styled.div`
  width: 200px;
  position: relative;
  .cover {
    width: 200px;
    position: relative;
  }
  .flower {
    position: absolute;
    height: 140px;
    left: 27px;
    bottom: 15px;
  }
  .label {
    position: absolute;
    width: 200px;
    left: 0;
    bottom: 0;
  }
  .title {
    position: absolute;
    top: 55px;
    right: 15px;
    font-family: ${(props) => props.font};
    font-size: 1.3rem;
    color: ${(props) => props.textColor};
  }
`;

function FinalPreview({ userfont = 'Sungsil', usercolor }) {
  // 사용자 선택, 폰트 불러오기
  const { title } = useSelector((state) => ({
    title: state.title,
  }));
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

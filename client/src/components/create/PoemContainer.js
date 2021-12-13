import React from 'react';
import styled from 'styled-components';

const PoemWrapper = styled.div`
  height: 55vh;
  width: 300px;
  position: relative;
  font-family: 'Sungsil';
  padding: 40px;
  background-color: white;
  .background {
    position: relative;
    width: 400px;
    height: 60vh;
  }
  .wrapper {
    height: 45vh;
    width: 200px;
    word-break: keep-all;
    top: 30px;
    left: 50px;
    position: absolute;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    .title {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .content {
      text-align: center;
    }
  }
`;
export default function PoemContainer({
  poem_title,
  poem_author,
  poem_content,
}) {
  const splitPoemList = poem_content.split('<br>');

  const title = poem_title !== '' ? poem_title + '-' + poem_author : '';

  const mainContentList = splitPoemList.map((content, index) => (
    <p key={index}>{content}</p>
  ));

  return (
    <PoemWrapper>
      {/* <img className="background" src={poemBackground} /> */}
      <div className="wrapper">
        <div className="title">{title}</div>
        <div className="content">{mainContentList}</div>
      </div>
    </PoemWrapper>
  );
}

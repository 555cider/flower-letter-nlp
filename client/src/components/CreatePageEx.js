import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const PageExplain = styled.div`
  background-color: white;
  width: 80vw;
  padding: 10px;
  font-family: 'EliceRegular';
  text-align: center;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(120, 120, 120, 0.2);
`;

export default function CreatePageEx({ exText }) {
  return (
    <PageExplain>
      <div className="text">{exText}</div>
    </PageExplain>
  );
}

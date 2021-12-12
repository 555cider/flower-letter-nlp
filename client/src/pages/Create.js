import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WriteLetter from '../components/WriteLetter';
// import EditAnthology from '../components/EditAnthology';

const Create = ({ history }) => {
  return (
    <div>
      <WriteLetter></WriteLetter>
    </div>
  );
};

export default Create;

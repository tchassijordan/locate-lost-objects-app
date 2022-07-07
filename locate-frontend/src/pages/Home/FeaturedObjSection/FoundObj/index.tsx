import React from 'react';
import Viz from '../Viz';

export default function FoundObjects({isFoundObj}: TProps) {
  return (
    <Viz
      requestMethod='GET'
      family='foundObjects'
      isFoundObj={isFoundObj}
    />
  );
}

type TProps = {
  isFoundObj: boolean;
}
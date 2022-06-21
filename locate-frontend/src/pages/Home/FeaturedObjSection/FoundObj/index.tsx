import React from 'react';
import Viz from '../Viz';

export default function FoundObjects() {
  return (
    <Viz
      requestMethod='GET'
      family='foundObjects'
    />
  );
}

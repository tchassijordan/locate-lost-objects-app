import React from 'react';
import Viz from '../Viz';

export default function LostObjects() {
  return (
    <Viz
      requestMethod='GET'
      family='lostObjects'
    />
  );
}

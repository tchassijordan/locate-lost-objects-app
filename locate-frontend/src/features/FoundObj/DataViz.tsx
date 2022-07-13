import React from 'react';
import { FeaturedObjViz } from '~/features/Viz';

export default function FoundObjects({ isFoundObj }: TProps) {
  return (
    <FeaturedObjViz
      requestMethod='GET'
      family='foundObjects'
      isFoundObj={isFoundObj}
    />
  );
}

type TProps = {
  isFoundObj: boolean;
};

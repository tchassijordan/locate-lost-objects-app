import React from 'react';
import LoadingSVG from '~/assets/icons/LoadingSVG';

export default function Loader({ isLoading, size }: IProps) {
  if (!isLoading) return null;
  return (
    <LoadingSVG
      className={`text-primary animate-spin w-[${size}px] h-[${size}px] ml-3`}
    />
  );
}

interface IProps {
  isLoading: boolean;
  size: number;
}

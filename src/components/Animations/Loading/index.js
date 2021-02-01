import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animation.json';

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
  );
}

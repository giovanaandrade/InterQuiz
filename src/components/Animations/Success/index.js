import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animation.json';

export default function Success() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={50}
        width={50}
      />

    </div>
  );
}
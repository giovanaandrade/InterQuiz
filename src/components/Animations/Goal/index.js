import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animation.json';

export default function Goal() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={200}
        width={200}
      />

    </div>
  );
}

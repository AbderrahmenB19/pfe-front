import React, { useEffect } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  useEffect(() => {
    const bgAnimation = document.getElementById('bgAnimation');
    const numberOfColorBoxes = 400;

    for (let i = 0; i < numberOfColorBoxes; i++) {
      const colorBox = document.createElement('div');
      colorBox.classList.add('colorBox');
      bgAnimation.append(colorBox);
    }
  }, []);

  return (
    <div className="bgAnimation" id="bgAnimation">
      <div className="backgroundAnim"></div>
    </div>
  );
};

export default AnimatedBackground;
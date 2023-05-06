import { startBtn } from './selectors.js';

const rotate = () => {
  let rotation = 360;
  return () => {
    startBtn.style = `transform: rotate(${rotation}deg)`;
    rotation += 360;
  };
};

const dancingButton = rotate();

export default dancingButton;

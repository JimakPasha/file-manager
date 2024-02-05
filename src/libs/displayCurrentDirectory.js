import { getCurrentPath } from './getCurrentPath.js';

export const displayCurrentDirectory = () => {
  console.log('You are currently in', getCurrentPath());
}

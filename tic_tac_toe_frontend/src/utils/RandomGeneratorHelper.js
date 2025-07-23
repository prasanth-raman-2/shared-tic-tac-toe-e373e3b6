/**
 * Helper functions for random number and value generation
 * Note: This is a placeholder for potential future random generation features
 */

// PUBLIC_INTERFACE
export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// PUBLIC_INTERFACE
export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Future implementations can be added here

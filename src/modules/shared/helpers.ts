export const getRandomColor = (): string => {
  const letters = 'BCDEF'.split('');
  let color = '#';

  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}

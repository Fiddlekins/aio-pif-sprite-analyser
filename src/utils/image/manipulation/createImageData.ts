export function createImageData(width: number, height: number) {
  // Firefox is broken and doesn't support `new ImageData(width, height, settings)`
  const imageData = new ImageData(width, height);
  return new ImageData(imageData.data, width, height, {colorSpace: 'srgb'});
}

export function cloneImageData(imageData: ImageData) {
  return new ImageData(imageData.data.slice(), imageData.width, imageData.height);
}

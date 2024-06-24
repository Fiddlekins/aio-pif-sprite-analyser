export async function getId(imageData: ImageData) {
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", imageData.data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

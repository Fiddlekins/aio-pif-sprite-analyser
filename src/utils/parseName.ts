export function parseName(name: string | null) {
  let headId: number | null = null;
  let bodyId: number | null = null;
  if (name) {
    const match = name.match(/(\d+)\D*\.\D*(\d+)/)
    if (match) {
      const [, headIdString, bodyIdString] = match;
      headId = parseInt(headIdString, 10) || null;
      bodyId = parseInt(bodyIdString, 10) || null;
    } else {
      // Treat unfused pokemon as just a body for background purposes
      const matchBody = name.match(/(\d+)\D*\.png/i);
      if (matchBody) {
        const [, bodyIdString] = matchBody;
        bodyId = parseInt(bodyIdString, 10) || null;
      }
    }
  }
  return {
    headId,
    bodyId,
  }
}

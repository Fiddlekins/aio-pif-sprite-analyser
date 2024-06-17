interface ColourCountElement {
  colourKey: number;
  count: number;
}

function mapFunc([colourKey, count]: [number, number]): ColourCountElement {
  return {colourKey, count}
}

function sortFunc(a: ColourCountElement, b: ColourCountElement) {
  return b.count - a.count;
}

export function getRankedColourCounts(colourCounts: Map<number, number>): ColourCountElement[] {
  return [...colourCounts.entries()]
    .map(mapFunc)
    .sort(sortFunc);
}

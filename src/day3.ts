// '#123 @ 3,2: 5x4'
// A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:

export const mapClaim = (claim: string) => {
  const [id, token, margins, sizes] = claim.split(' ');
  const [leftMargin, topMargin] = margins
    .slice(0, margins.length - 1)
    .split(',')
    .map(Number);
  const [width, tall] = sizes.split('x').map(Number);
  let columns = {};
  for (let columnIndex = 1; columnIndex <= width; columnIndex++) {
    columns = Object.assign(columns, { [columnIndex + leftMargin]: true });
  }
  let result = {};
  for (let rowIndex = 1; rowIndex <= tall; rowIndex++) {
    result = Object.assign(result, { [rowIndex + topMargin]: columns });
  }
  return result;
};

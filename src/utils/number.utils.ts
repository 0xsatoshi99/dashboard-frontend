export const formattedBalance = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toFixed(2);
  }
};

export const shortenDecimalNumber = (num: number) => {
  if (num < 0.0000001) return "0";
  const str = num.toString();
  const match = str.match(/0\.(0*)([1-9]\d*)/);

  if (!match) return str; // Return as is if no match

  const zeroCount = match[1].length;
  const significantPart: string = match[2];

  if (zeroCount < 3) {
    return num.toLocaleString();
  }

  return `0.0(${zeroCount})${significantPart.slice(0, 4)}`;
};

export const averageOf = (arr: (number | undefined)[]): number => {
  return arr
    .filter((n): n is number => n !== undefined)
    .reduce((acc, cur, _, filteredArr) => acc + cur / filteredArr.length, 0);
};

export const sumOf = (arr: (number | undefined)[]): number => {
  return arr.filter((n): n is number => n !== undefined).reduce((acc, cur) => acc + cur, 0);
};

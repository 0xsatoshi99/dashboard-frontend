export const capitalizedString = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const intToIPv4 = (ipInt: number) => {
  return [(ipInt >> 24) & 255, (ipInt >> 16) & 255, (ipInt >> 8) & 255, ipInt & 255].join(".");
};

export const IPv4ToInt = (ipStr) => {
  return ipStr.split(".").reduce((acc, octet) => (acc << 8) + Number(octet), 0);
};

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
      ? [x, c, 0]
      : h < 180
      ? [0, c, x]
      : h < 240
      ? [0, x, c]
      : h < 300
      ? [x, 0, c]
      : [c, 0, x];

  const toHex = (v) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Final version: generate vivid hex colors from string
export function stringToColorHex(str) {
  if (str === "Mine") return "#f34";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 8) - hash);
  }

  let hue = (Math.abs(hash) * str.length) % 360;

  // if (hue < 250 && hue > 220) {
  //   hue = (hue + 40) % 360; // shift away from red
  // }
  // Avoid red (approx 330–30)
  if (hue < 30 || hue > 330) {
    hue = (hue + 80) % 360; // shift away from red
  }

  const s = (Math.abs(hash) % 15) + 45;
  const l = (Math.abs(hash) % 10) + 50;

  return hslToHex(hue, s, l);
}

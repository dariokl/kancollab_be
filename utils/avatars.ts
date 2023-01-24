const colors: string[] = ["b6e3f4v", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"];

const eyes: string[] = [
  "bulging",
  "dizzy",
  "frame1",
  "frame2",
  "glow",
  "happy",
  "hearts",
  "robocop",
  "round",
  "sensor",
  "shade01",
];

const mouth: string[] = [
  "bite",
  "diagram",
  "smile01",
  "smile02",
  "grill01",
  "grill02",
  "grill03",
  "square01",
  "square02",
];

const randomize = (items: string[]): string => {
  // "~~" for a closest "int"
  return items[~~(items.length * Math.random())];
};

export const avatarStringBuilder = (): string => {
  return `https://api.dicebear.com/5.x/bottts-neutral/svg?size=32&radius=50&backgroundType=gradientLinear&backgroundColor=${randomize(
    colors
  )}&eyes=${randomize(eyes)}&mouth=${randomize(mouth)}`;
};

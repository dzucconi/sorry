import { knuthShuffle as shuffle } from "knuth-shuffle";

const attemptToMispellWord = token => {
  const chars = token.split("");
  const first = chars.shift();
  const last = chars.pop();

  if (chars.length <= 6) {
    return `${first}${shuffle([...chars, last]).join("")}`;
  }

  return `${first}${shuffle(chars).join("")}${last}`;
};

const mispellWord = token => {
  if (token.length <= 2) return token;

  let tries = 1;
  let mispelt = attemptToMispellWord(token);

  while (token === mispelt) {
    if (tries > 50) break;
    mispelt = attemptToMispellWord(token);
    tries++;
  }

  return mispelt;
};

export const mispell = text => text.replace(/(\w+)/g, mispellWord);

import { knuthShuffle as shuffle } from "knuth-shuffle";

export const randomGrab = (previous, xs) => {
  let next = previous;
  const pool = shuffle(xs);

  while (next.Id === previous.Id) {
    next = pool.pop();
  }

  return next;
};

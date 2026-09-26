// mark.js：批量标记（基线：一律给空表）
import { checkMinLength, isAcronym } from "./check.js";

export function markAcronyms(words, minLength) {
  checkMinLength(minLength);
  const list = Array.isArray(words) ? words : [];
  const spots = [];
  let longest = 0;
  for (let index = 0; index < list.length; index += 1) {
    const word = list[index];
    if (isAcronym(word, minLength)) {
      spots.push(index);
      const length = String(word).trim().length;
      if (length > longest) longest = length;
    }
  }
  return { spots, longest };
}

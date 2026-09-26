// mark.js：批量标记——一次扫描，每词只判一次，位置按出现顺序严格递增。
import { isAcronym } from "./check.js";

export function markAcronyms(words, minLength) {
  const spots = [];
  let longest = 0;
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if (isAcronym(word, minLength)) {
      spots.push(index);
      const length = word.trim().length;
      if (length > longest) longest = length;
    }
  }
  return { spots, longest };
}

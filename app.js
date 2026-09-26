// app.js：渲染结果
import { isAcronym } from "./check.js";
import { markAcronyms } from "./mark.js";

export function render(spec) {
  const words = spec.words || [];
  const minLength = spec.min_length || 1;
  const view = markAcronyms(words, minLength);
  const spots = view.spots || [];
  return { spots: spots, count: spots.length, longest: view.longest || 0,
           word_count: words.length, min_length: minLength,
           first: spots.length ? words[spots[0]] : "" };
}

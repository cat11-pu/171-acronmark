// check.js：判一个词——全部由大写字母组成且长度不小于最短长度才算缩写。
export function isAcronym(word, minLength) {
  if (typeof minLength !== "number" || minLength < 1) {
    const error = new Error("minLength must be >= 1");
    error.code = "E_BAD_WORD";
    throw error;
  }
  const text = typeof word === "string" ? word.trim() : "";
  if (text.length === 0) {
    const error = new Error("word must not be blank");
    error.code = "E_BAD_WORD";
    throw error;
  }
  return text.length >= minLength && /^[A-Z]+$/.test(text);
}

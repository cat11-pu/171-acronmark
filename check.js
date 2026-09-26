// check.js：判一个词——全部由大写字母 A-Z 组成、且长度不小于最短长度才算缩写。
const UPPERCASE_WORD = /^[A-Z]+$/;

function badWordError(message) {
  const error = new Error(message);
  error.code = "E_BAD_WORD";
  return error;
}

export function checkMinLength(minLength) {
  if (typeof minLength !== "number" || !Number.isFinite(minLength) || minLength < 1) {
    throw badWordError("minLength must be a finite number no less than 1");
  }
}

export function isAcronym(word, minLength) {
  checkMinLength(minLength);
  const text = typeof word === "string" ? word.trim() : "";
  if (text === "") {
    throw badWordError("word is empty after trimming whitespace");
  }
  return text.length >= minLength && UPPERCASE_WORD.test(text);
}

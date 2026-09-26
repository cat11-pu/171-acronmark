// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let min = spec.min_length || 2;
  parts.log.textContent = "词 " + (spec.words || []).length + " 个，最短长度 " + min + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { min_length: min }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.words || []).forEach(function (word, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = word;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.spots.indexOf(spot) !== -1 ? " ok" : "");
      mark.textContent = view.spots.indexOf(spot) !== -1 ? "算缩写" : "不算";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "缩写 " + view.count + " 个，最长 " + view.longest;
    parts.log.textContent = "最短长度 " + min;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "标记缩写";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "最短长度加一";
  moreButton.addEventListener("click", function () {
    min = min + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "最短长度减一";
  lessButton.addEventListener("click", function () {
    min = Math.max(1, min - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "试一个词";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "HTTP";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { words: (spec.words || []).concat([box.value]) }));
      const spot = view.spots.indexOf(view.spots[view.spots.length - 1]);
      parts.out.textContent = box.value + (view.spots.indexOf((spec.words || []).length) === -1 ? " 不算缩写" : " 算缩写");
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看缩写个数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { min_length: min }));
    parts.out.textContent = "缩写 " + view.count + " 个，最长 " + view.longest;
  });
  parts.controls.appendChild(readButton);

  draw();
}

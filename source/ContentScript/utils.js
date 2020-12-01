import { outlineParser } from './ast';

export function getFileNameExt(url) {
  const filename = url.slice(url.lastIndexOf('/') + 1);
  const ext = filename.slice(filename.lastIndexOf('.') + 1);
  return ext;
}

export async function getCodeLiteral() {
  const rawCodeUrl = document.querySelector('#raw-url').href;
  const response = await fetch(rawCodeUrl);
  const text = await response.text();
  return text;
}

export async function startParsing() {
  const rawCodeUrl = document.querySelector('#raw-url').href;
  const codeLiteral = await getCodeLiteral(rawCodeUrl);
  return outlineParser(codeLiteral, getFileNameExt(rawCodeUrl));
}

export function getScrollBarWidth() {
  var inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);

  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return (w1 - w2);
};
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
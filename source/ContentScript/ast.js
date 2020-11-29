import JSImpl from './language/javascript';
import TSImpl from './language/typescript';

export function outlineParser(literal, ext) {
  console.log(ext)
  switch (ext) {
    case 'js':
      return JSImpl.parser(literal);
    case 'ts':
      return TSImpl.parser(literal);
    default:
      return JSImpl.parser(literal);
  }
}

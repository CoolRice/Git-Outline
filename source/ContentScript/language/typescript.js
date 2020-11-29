import {parse} from '@babel/parser';
import JSImpl from './javascript';

const TSImpl = {};

const config = {
  sourceType: 'module',
  errorRecovery: true,
  plugins: [
    ...['jsx', 'typescript', 'classProperties'],
    ...JSImpl.presetPlugins,
  ],
};

const parser = (literal) => {
  const ast = parse(literal, config);
  return JSImpl.walk(ast);
};

TSImpl.parser = parser;

export default TSImpl;
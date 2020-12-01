import {parse} from '@babel/parser';
import traverse from '@babel/traverse';

const JSImpl = {};

const presetPlugins = [
  'classPrivateProperties',
  'classPrivateMethods',
  'classStaticBlock',
  'decimal',
  ['decorators', {decoratorsBeforeExport: true}],
  'doExpressions',
  'exportDefaultFrom',
  'functionBind',
  'importAssertions',
  'moduleStringNames',
  'partialApplication',
  ['pipelineOperator', {proposal: 'smart'}],
  'privateIn',
  ['recordAndTuple', {syntaxType: 'hash'}],
  'throwExpressions',
  'topLevelAwait',
];

const config = {
  sourceType: 'module',
  errorRecovery: true,
  plugins: [...['jsx', 'flow', 'classProperties'], ...presetPlugins],
};

const dealVariableDeclaration = (declaration) => {
  const result = [];
  declaration.declarations.forEach((item) => {
    if (item.id.type === 'ObjectPattern' && item.id.properties) {
      item.id.properties.forEach((i) => {
        result.push({
          name: i.key.name,
          line: i.key.loc.start.line,
          type: 'var',
        });
      });
    } else {
      result.push({
        name: item.id.name,
        line: item.id.loc.start.line,
        type: 'var',
      });
    }
  });
  return result;
};

const dealFunctionDeclaration = (declaration) => {
  return {
    name: declaration.id.name,
    line: declaration.loc.start.line,
    type: 'func',
  };
};

const dealClassDecalaration = (declaration) => {
  return {
    name: declaration.id.name,
    line: declaration.loc.start.line,
    type: 'class',
  };
};

const dealExportDefaultDeclaration = (item) => {
  if (item.declaration) {
    if (item.declaration.type === 'VariableDeclaration') {
      return dealVariableDeclaration(item.declaration);
    }
    if (item.declaration.type === 'FunctionDeclaration') {
      return dealFunctionDeclaration(item.declaration);
    }
    if (item.declaration.type === 'ClassDeclaration') {
      return dealClassDecalaration(item.declaration);
    }
    if (item.declaration.type === 'TSTypeAliasDeclaration') {
      return dealTSTypeAliasDeclaration(item.declaration);
    }
  }
};

const dealExportNamedDeclaration = (item) => {
  return dealExportDefaultDeclaration(item);
};

const dealTypeAlias = (item) => {
  return {
    name: item.id.name,
    line: item.loc.start.line,
    type: 'type',
  };
};
const dealTSInterfaceDeclaration = (item) => {
  return {
    name: item.id.name,
    line: item.loc.start.line,
    type: 'interface',
  };
};
const dealTSTypeAliasDeclaration = (item) => {
  return {
    name: item.id.name,
    line: item.loc.start.line,
    type: 'type',
  };
};

//https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md
const walk = (ast) => {
  let outlines = [];
  traverse(ast, {
    Program(path) {
      console.log(path.node.body)
      path.node.body.forEach((item) => {
        if (item) {
          let outline;
          let currentOutlines = [];
          if (item.type === 'VariableDeclaration') {
            currentOutlines.push(dealVariableDeclaration(item));
          }
          if (item.type === 'FunctionDeclaration') {
            currentOutlines.push(dealFunctionDeclaration(item));
          }
          if (item.type === 'ClassDeclaration') {
            currentOutlines.push(dealClassDecalaration(item));
          }
          if (item.type === 'ExportDefaultDeclaration') {
            currentOutlines.push(dealExportDefaultDeclaration(item));
          }
          if (item.type === 'ExportNamedDeclaration' && item.declaration) {
            currentOutlines.push(dealExportNamedDeclaration(item));
          }
          if (item.type === 'TypeAlias') {
            currentOutlines.push(dealTypeAlias(item));
          }
          if (item.type === 'TSInterfaceDeclaration') {
            currentOutlines.push(dealTSInterfaceDeclaration(item));
          }
          if (currentOutlines) {
            currentOutlines.flat(Infinity).forEach((item) => {
              if (item?.name && item?.line) {
                outlines.push(item);
              }
            });
          }

        }
      });
    },
  });
  // console.log(outlines)
  return outlines;
};

const parser = (literal) => {
  const ast = parse(literal, config);
  return walk(ast);
};

JSImpl.parser = parser;
JSImpl.presetPlugins = presetPlugins;
JSImpl.walk = walk;

export default JSImpl;

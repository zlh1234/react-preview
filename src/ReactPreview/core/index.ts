import { transform as BabelTransform } from 'babel-standalone';

const getCodeFunc = (code: string, scope: { [key: string]: any }) => {
	const keys = Object.keys(scope);
	const values = keys.map((key) => scope[key]);

	const res = new Function(...keys, code);
	return res(...values);
};

const transform = (code: string) => {
	const text: string = `
    () => {
      ${code}
    }
  `;
	const option = {
		presets: ['es2015', 'react', 'stage-1'],
	};
	let transformCode = BabelTransform(text, option).code;
	return transformCode
		.replace(/(\(function \(\) \{)[\r\n]/, '')
		.replace(/\}\)\;$/, '');
};

/**
 * es6代码转换为es5
 * @returns 转换后的代码
 */
type FuncType = (code: string, scope: { [key: string]: any }) => any;

export const createElement: FuncType = (code = '', scope = {}) => {
	const transformCode = transform(code.trim().replace(/;$/, ''));
	return { transformCode, node: getCodeFunc(transformCode, scope) };
};

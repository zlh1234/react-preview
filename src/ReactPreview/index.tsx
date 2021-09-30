import React, { Component } from 'react';
import { createElement } from './core';
import { IProps, IState } from '../index.d';
import less from 'less';

class ReactPreview extends Component<IProps, IState> {
	private styleId: string;
	constructor(props) {
		super(props);
		this.state = {
			transformCode: '',
			error: null,
			EleNode: null,
		};
		this.styleId = `${this.props.styleIdPre}_REACT_ONLINE_STYLE_EL`;
	}

	componentDidCatch(err) {
		this.catchError(err);
	}

	componentDidMount() {
		let { code, scope } = this.props;
		let reg = /<style>[\s\S.]*?<\/style>/gi;

		//匹配less标签
		let macths = code.match(reg);
		if (macths && macths.length) {
			let lessCode = code
				.match(reg)[0]
				.replace('<style>', '')
				.replace('</style>', '');
			this.appendStyle(lessCode);
		}

		//匹配组件代码
		let currentCode = code.replace(reg, '');
		try {
			let { transformCode, node } = createElement(currentCode, scope);
			this.setState({ transformCode });
			this.setNode(node);
		} catch (error) {
			this.catchError(error);
		}
	}

	componentWillUnmount() {
		this.removeStyleEl();
	}

	/**
	 * 移除css元素
	 */
	removeStyleEl = () => {
		let el: any = document.getElementById(this.styleId);
		if (el) {
			if (el.remove) {
				el.remove();
			} else {
				//兼容IE11
				el.removeNode(true);
			}
		}
	};

	/**
	 * 添加style元素
	 * @param {String} lessCode less格式css代码
	 */
	appendStyle = (lessCode) => {
		if (lessCode && lessCode.replace(/[\r\n\s]+/g, '') !== '') {
			less.render(lessCode)
				.then(({ css }) => {
					let oStyle = document.getElementById(this.styleId);
					if (oStyle) {
						oStyle.innerHTML = css || '';
					} else {
						let style: HTMLStyleElement =
							document.createElement('style');
						style.appendChild(document.createTextNode(css || ''));
						style.id = this.styleId;
						document.head.appendChild(style);
					}
				})
				.catch((err) => {
					let str = (err?.extract || []).join('\n');
					str = '\n' + str + '\n' + err?.message;
					console.error('css解析发生错误', str);
				});
		} else {
			this.removeStyleEl();
		}
	};

	/**
	 * 捕获错误
	 * @param {Error} err
	 */
	catchError = (err) => {
		let { errorSourceCode = false } = this.props;
		if (errorSourceCode) {
			console.log('Err code : ', this.state.transformCode);
		}
		console.error(err);
		this.setState({ error: err.toString(), EleNode: null });
	};

	/**
	 * 设置节点
	 * @param {ReactNode} node
	 */
	setNode = (node) => {
		this.setState({ error: null, EleNode: node });
	};

	render() {
		const { EleNode, error } = this.state;
		if (EleNode) return <EleNode />;
		if (error) return error;
		return null;
	}
}

export default ReactPreview;

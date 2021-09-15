import React, { Component } from 'react';
import { createElement } from './core';
import { IProps, IState } from '../index.d';

class ReactPreview extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			transformCode: '',
			error: null,
			EleNode: null,
		};
	}

	componentDidCatch(err) {
		this.catchError(err);
	}

	componentDidMount() {
		let { code, scope = {} } = this.props;
		try {
			let { transformCode, node } = createElement(code, scope);
			this.setState({ transformCode });
			this.setNode(node);
		} catch (error) {
			this.catchError(error);
		}
	}

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

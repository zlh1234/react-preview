import React from 'react';
export interface IProps {
	//源码
	code: string;
	//作用域内模块
	scope?: { [key: string]: any };
	//报错时是否在控制台展示报错源码
	errorSourceCode?: boolean;
	//动态样式ID前缀
	styleIdPre?: string;
}
export interface IState {
	transformCode?: string;
	error?: any;
	EleNode?: any;
}
declare class ReactPreview extends React.Component<IProps, IState> {
	[key: string]: any;
}
export default ReactPreview;

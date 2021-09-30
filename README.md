##### 安装

```
npm i react-preview-component -S
```

##### 更新记录

> v.1.0.3 2021-09-30  
> 支持 less 样式解析

##### 引入

```tsx
import ReactPreview from 'react-preview-component';
```

##### API

| 属性名          | 含义                           | 类型    | 是否必传 | 默认值 |
| --------------- | ------------------------------ | ------- | -------- | ------ |
| code            | 代码内容                       | string  | 是       | -      |
| scope           | 作用域对象                     | Object  | 否       | {}     |
| errorSourceCode | 报错时是否在控制台输出错误代码 | Boolean | 否       | false  |
| styleIdPre      | 动态代码 style ID 前缀         | string  | 否       | -      |

##### 示例

code 必须返回一个函数，参考 react hooks 函数式组件
默认作用域默认为空，scope 传入后可在 code 中直接使用。代码默认会转为 ES5

```tsx
import React from 'react';
import ReactPreview from 'react-preview-component';

export default () => {
	return (
		<ReactPreview
			code={`
                return () => {
                    const { useState } = React;
                    const [text, setText] = useState('zlinhui');
                    return <div className="cus-wrapper">{name}</div>;
                }

                <style>
                    .cus-wrapper {
                        position: relative;
                        width: 100%;
                    }
                </style>
            `}
			scope={{ React }}
		/>
	);
};
```

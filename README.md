##### 安装

```
npm i @sihe/react-online -S
```

##### 引入

```tsx
import ReactOnline from '@sihe/react-online';
```

##### API

| 属性名 | 含义       | 类型   | 是否必传 | 默认值 |
| ------ | ---------- | ------ | -------- | ------ |
| code   | 代码内容   | string | 是       | -      |
| scope  | 作用域对象 | Object | 否       | {}     |

##### 示例

code 必须返回一个函数，参考 react hooks 函数式组件
默认作用域默认为空

```tsx
import React from 'react';
import ReactOnline from '@sihe/react-online';

export default () => {
	return (
		<ReactOnline
			code={`
                return () => {
                    const { useState } = React;
                    const [text, setText] = useState('zlinhui');
                    return <div>{name}</div>;
                }
            `}
			scope={{ React }}
		/>
	);
};
```

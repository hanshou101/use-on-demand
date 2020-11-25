# Hello VuePress [![Build Status](https://travis-ci.com/hanshou101/use-on-demand.svg?branch=master)](https://travis-ci.com/hanshou101/use-on-demand.svg?branch=master)


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

:tada: :100:

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

1 + 1 ={{ 1 + 1 }} <Badge>动态计算</Badge>

<span v-for="i in 3">{{ i }} </span> <Badge>动态生成</Badge>

{{ $page }} <Badge>获取网站元数据</Badge>

<Badge>对原始文本转义</Badge>
::: v-pre
`{{ This will be displayed as-is }}`
::: 

# text H1无法被搜索到。
## text <Badge>标题中使用徽章</Badge> <OutboundLink></OutboundLink>
## text123 <Badge>自定义组件，不影响搜索</Badge>
## abcde

<script>
    /* alert('测试内容'); */
    /* 建议使用多行注释。 */
    console.log('此处的代码，将会直接执行');
</script>

<Badge>一个徽章</Badge><Badge type="warning" vertical="top">黄色徽章</Badge>
<Badge type="error" vertical="middle">红色徽章</Badge>

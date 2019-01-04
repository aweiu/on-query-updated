# on-query-updated
[Mixin](https://cn.vuejs.org/v2/guide/mixins.html) 该 Vue 组件，给页面增加一个响应`$route.query`变化的`onQueryUpdated`回调

## 安装
```
npm install on-query-updated
```

## onQueryUpdated (query: Query, diffResult: DiffResult)
* query: [当前Query对象](https://github.com/aweiu/wow-query#query)
* diffResult: [与上次的Query对象的对比结果](https://github.com/aweiu/simple-compare#simple-compare)

> 如果一个页面有多个Query业务，可以利用 diffResult 参数来实现各自业务监听各自Query字段的变更。比如，某页面既有用户查询，又有产品查询，那用户的查询参数变更显然不应该触发产品查询

## 示例
```
import onQueryUpdated from 'on-query-updated'
export default {
  mixins: [onQueryUpdated],
  // 该回调会在组件 created 和 $route.query 变化时触发
  onQueryUpdated (query, diffResult) {
    console.log(query, diffResult)
  }
}
```
* [分页（待更新）]()
* [分页和搜索（待更新）]()
* [多个Query业务通过diffResult实现最小化请求（待更新）]()

## 其它
无论是分页还是搜索，都会向服务器提交相应的查询参数，要尽可能将查询参数映射在页面的 url 中，$route.query 就对应了页面的状态

好处是保持了数据展示的一致性，直接将页面的 url 分享出去就相当于分享了当前你的页面状态，便于协同工作

同时，对于开发者来说，该类业务就可抽象为你只需要去改变 $route.query ，然后在`onQueryUpdated`回调中去执行数据获取就好

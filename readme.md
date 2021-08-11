# vue-auto-name


自动生成vue组件的名称。也就是把：
```vue
export default {
    ...
}
```
转换为
```vue
export default {
    name: '组件名'
    ...
}
```
组件名来自于文件名

## 用法
package.json 中添加一个script:

```json
{
    "scripts": {
        "set-names": "node -e \"require('vue-auto-name')('src')\""
    },
    "devDependencies": {   
        "vue-auto-name": "^1.0.2"
    }
}
```
然后运行：  

`npm run set-names`

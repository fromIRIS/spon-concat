## Summary
这个插件为了活动页面开发，暂时在后台cms端不能做很多改动。

在活动页面开发完并成功build之后，再调用此插件命令，生成合并后的文件，然后直接复制到cms里。

合并后的文件在build目录下对应page内。

## Usage

```
spon mb concat -n 'page-name'
```
对H5页面进行合并，并自动在合并的文件末尾生成分享所需的代码片段


```
spon pc concat -n 'page-name'
```
对pc页面进行合并，不生成分享所需代码。
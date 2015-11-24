
ImageConcat development based on the GM, used to implement the PNG image stitching, can facilitate the generation of Sprite Sprite, and export the json data, CSS



```
var config ={
	source:'./dist/sprites/',
	imgDir:'dist/sprites/',
	dataType:'json,css', 
	dataDir:'dist/sprites/',
	direction:1,
	prefixer:['babyFade','bigEat'],
	suffix:'.min',
}
```

####### source: 图片资源路径
####### imgDir: 导出图片的路径
####### dataType: 同时生成json、css，或只生成一个
####### dataDir:  数据生成的地址
####### direction: 排列方式 1 horizontial 0 vertical.
####### prefixer: 根据前缀生成的多个sprite图片,如果不写将全部图片生成到一张图中

### 生成JSON数据

```
  {
    "babyFade": {
        "babyFade0": {
            "path": "dist\\sprites\\babyFade0.png",
            "x": 0,
            "y": 0,
            "w": 41,
            "h": 46
        },
        "babyFade1": {
            "path": "dist\\sprites\\babyFade1.png",
            "x": 41,
            "y": 0,
            "w": 41,
            "h": 46
        },
        "src": "dist/sprites/babyFade.min.png"
    },
    "bigEat": {
        "bigEat0": {
            "path": "dist\\sprites\\bigEat0.png",
            "x": 0,
            "y": 0,
            "w": 46,
            "h": 55
        },
        "bigEat1": {
            "path": "dist\\sprites\\bigEat1.png",
            "x": 46,
            "y": 0,
            "w": 46,
            "h": 55
        },
        "src": "dist/sprites/all.min.png"
    }
}

```


### 生成CSS



```
.babyFade0{
    background:url(./dist/sprites/all.min.png) 0 0;
    width:41;
    height:46;
}

.bigEat0{
    background:url(./dist/sprites/all.min.png) 251 0;
    width:46;
    height:55;
}
.bigEat1{
    background:url(./dist/sprites/all.min.png) 297 0;
    width:46;
    height:55;
}
.bigEat2{
    background:url(./dist/sprites/all.min.png) 343 0;
    width:46;
    height:55;
}
```


### Start
ImageConcat是基于gm开发，首先安装[gm](https://github.com/aheckmann/gm)
```
   npm install gm 
```
注意：gm需要安装ImageMagick或者GraphicMagick,详情请看gm


ImageConcat 安装

```
npm install imageConcat
```

运行：

```
var ic = require('imageConcat');
ic.init({
    source:'./dist/sprites/',
    imgDir:'dist/sprites/',
    dataType:'json,css', 
    dataDir:'dist/sprites/',
    direction:1,
    prefixer:['babyFade','bigEat'],
});

```

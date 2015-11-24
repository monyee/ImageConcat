# ImageConcat



### ImageConcat 基于GM开发，用于实现png图片的拼接，可以方便的生成sprite精灵图片，并导出json、css数据



```
var config ={
	source:'./dist/sprites/',
	imgDir:'dist/sprites/',
	dataType:'json,css', //同时生成json、css，或只生一个
	dataDir:'dist/sprites/',
	direction:1, //1 horizontial 0 vertical.
	prefixer:['babyFade','bigEat'],//根据前缀生成的多个sprite图片,如果不写将全部图片生成到一张图中
	suffix:'.min',
}
```


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


### 运行

```
First download and install GraphicsMagick or ImageMagick. In Mac OS X, you can simply use Homebrew and do:

brew install imagemagick
brew install graphicsmagick
If you want WebP support with ImageMagick, you must add the WebP option:

brew install imagemagick --with-webp
then either use npm:

npm install gm
or clone the repo:

git clone git://github.com/aheckmann/gm.git
```

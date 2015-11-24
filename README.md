# ImageConcat



### ImageConcat 基于GM开发，用于实现图片的拼接，可以方便的生成sprite精灵图片，并导出json数据



```
var config ={
	source:'./dist/sprites/',
	imgDir:'dist/sprites/',
	dataType:'json',
	dataDir:'dist/sprites/',
	direction:1, //1 horizontial 0 vertical.
	prefixer:['babyFade','bigEat'],//生成的sprite图片的前缀
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
        "babyFade2": {
            "path": "dist\\sprites\\babyFade2.png",
            "x": 82,
            "y": 0,
            "w": 41,
            "h": 46
        },
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
        }
    }
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

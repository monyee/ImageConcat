var ic = require('./imageConcat');
ic.init({
    source:'./dist/sprites/',
    imgDir:'dist/sprites/',
    dataType:'json,css', 
    dataDir:'dist/sprites/',
    direction:1,
    prefixer:['babyFade','bigEat'],
});
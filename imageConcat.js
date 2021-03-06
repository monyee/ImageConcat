var fs = require('fs');
var path = require('path');
var gm = require('gm').subClass({imageMagick:true,graphicsMagick:true});


var config ={
	source:'./dist/sprites/',
	imgDir:'dist/sprites/',
	dataType:'css,json',//export css/json
	dataDir:'dist/sprites/',
	direction:1, //1 horizontial 0 vertical.
	prefixer:['babyFade','bigEat'],//'babyFade','bigEat'
	suffix:'.min',
}

var sprites = {};
var spritesMode ={};
var taskQueue = [];

var cates = {};

var isByPrefixer = (config.prefixer && config.prefixer.length > 0);

if(isByPrefixer){
	for(p of config.prefixer){
		sprites[p] = {};
		cates[p] ={offsetX:0,offsetY:0};
		spritesMode[p] = [];
	}
}else{
	spritesMode = [];
	cates ={offsetX:0,offsetY:0};
}


function init(_config){
	if(_config){
		for(var i in _config){
			config[i]= _config[i];
		}
	}
	fs.readdir(config.source,function(err,files){
		if(err){
			throw err;
		}else{
			files = files.filter(function(item){
				return item.indexOf('.png') != -1 && item.indexOf(config.suffix+'.png') == -1;
			});
			files.sort();

			if(isByPrefixer){
				for(var f of files){
					category(f);
				}
			}else{
				spritesMode = files;
				for(var f of files){
					sprites[f.split('.')[0]] = {};
				}
			}

			merge();
			mergeData();
		}
	})
} 

//category by config prefixer
function category(fileName){
	for(p of config.prefixer){
		if(fileName.match(p)){
			sprites[p][fileName.split('.')[0]] = {};
			spritesMode[p].push(fileName);
		}
	}
}

function merge(){
	if(isByPrefixer){
		for(var p in spritesMode){
			mergeImgs(spritesMode[p],p)
		}
	}else{
		mergeImgs(spritesMode)
	}
}

function mergeData(){

	for(var item in sprites){
		if(isByPrefixer){
			
			for(var s in sprites[item]){
				setupQueue(s,item);
			}
		}else{
			setupQueue(item,null);
		}
	}

	
	
	function setupQueue(s,cate){
		var filePath = path.join(config.source,s+'.png');
		taskQueue.push({cate:cate,s:s,path:filePath});
	}
	
	record(taskQueue.shift());
	function record(info){
		if(!info){
			onTaskQueue();
			return;
		}
		gm(info.path).size(function(err,data){
			if(err)
				throw err;
			var w = data.width,h =data.height;

			var point =updateDimension(w,h,info.cate);
			
			var dt = {
				path:info.path,
				x:point.x,
				y:point.y,
				w:w,
				h:h,
			}
			info.cate ? sprites[info.cate][info.s] = dt : sprites[info.s] = dt;
			//console.log('==**=='+info.s,data.width,data.height,dt);
			record(taskQueue.shift());
		});
	}
}



function onTaskQueue(){

	var chunk="",_path;

	if(config.dataType.match(/css/)){
		for(i in sprites){
			if(isByPrefixer){
				for(var s  in sprites[i]){
					chunk += 
`.${s}{
	background:url(${config.source+i+config.suffix+'.png'}) ${sprites[i][s]['x']} ${sprites[i][s]['y']};
	width:${sprites[i][s]['w']};
	height:${sprites[i][s]['h']};
}`+'\n';
				}
			}else{
				chunk += 
`.${i}{
	background:url(${config.source+'all'+config.suffix+'.png'}) ${sprites[i]['x']} ${sprites[i]['y']};
	width:${sprites[i]['w']};
	height:${sprites[i]['h']};
}`+'\n';
			}
		}

		_path = path.join(config.dataDir,'sprites.css');
		run(_path,chunk,'CSS');
	}

	chunk = "";
	if(config.dataType.match(/json/)){
		for(var item in sprites){
		if(isByPrefixer){
			sprites[item]['src'] = config.imgDir+item+config.suffix+'.png';
			console.log('ccc'+sprites[item]['src'])
			}else{
				sprites['src'] = config.imgDir+'all'+config.suffix+'.png';
			}
		}
	
		chunk = JSON.stringify(sprites);
		_path = path.join(config.dataDir,'data.json');
		run(_path,chunk,'JSON');
	}

	function run(path,chunk,type){
		fs.writeFile(path,chunk,'utf8',function(err){
			if(err)
				throw err;
			else
				console.log('======'+type+' SAVED!======');
		})
	}
}


function mergeImgs(fileNames,animName){
	var filePath,_gm = gm();
	for(f of fileNames){
		filePath = path.join(config.source,f);
		_gm.append(filePath);
	}
	_gm.append(!!config.direction)
	//.noProfile()//删除数码设备等描述数据
	//.minify()
	//.trim()
	//.type('Optimize')
	//.quality(5)//[0~100]
	.background('transparent') //解决在图片尺寸不一致的时候空缺的地方默认会有白底
	.write(config.imgDir+(animName || 'all')+config.suffix+'.png',function(err){
		if(err)
			throw err;
		else
			console.log((animName || '')+' Merge Done!');
	}) 
}

//*****new version can pass a arry to append function
// spritesMode = spritesMode.map(function(item){
// 		return path.join(config.source,item); 
// 	})

// gm().append(spritesMode)
// .write(config.source+( 'all')+config.suffix+'.png',function(err){
// 	if(err)
// 		throw err;
// 	else
// 		console.log(( '')+' Merge Done!');
// })


var offsetX = 0,offsetY = 0;
function updateDimension(w,h,catename){
	var _x = config.direction == 1 ? w:0,
	    _y = config.direction == 0 ? h:0;
	if(catename){
		if(!cates[catename]['flag']){
			 cates[catename]['flag'] = true;
			 return {x:0,y:0};
		}
		cates[catename]['offsetX'] += _x;
		cates[catename]['offsetY'] += _y;
		 return {x:cates[catename]['offsetX'],y:cates[catename]['offsetY']};
	}else{
		if(!cates.flag){
			 cates.flag = true;
			  return {x:0,y:0};
		}
		cates['offsetX'] += _x;
		cates['offsetY'] += _y;
		 return {x:cates['offsetX'],y:cates['offsetY']};
	}
}

module.exports.init = init;



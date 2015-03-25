(function(exports){
	exports.hooker=function(obj,prop,prev,after){
	var slice=[].slice;
	//验证prop是否为有效function
	if(typeof prop!=='string'||!obj[prop]||typeof obj[prop]!=='function'){
		throw new Error('无效的属性'+prop);
	}
	//原始值
	var orig=obj[prop];
	function hooker(){
		var preResult;
		var oriResult;
		var args = slice.call(arguments);
		if(prev){
			preResult=prev.apply(this, args)
		}
		origResult = orig.apply(this, args);
		if(after){
			var tmp=after.apply(this, [origResult].concat(args).concat(preResult))
			if(tmp){
				origResult=tmp;
			}
		}
		return origResult;
	}
	obj[prop]=hooker;
	//有些属性是不可配置，所以赋值是失败
	if(obj[prop]!==hooker){
		throw new Error('不可配置属性'+prop+'，不能修改') 
	}
	return 
}
}(typeof exports === "object" && exports || this));

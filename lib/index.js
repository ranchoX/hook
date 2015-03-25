(function(exports){
	function Link(prev,after){
		var self=this;
		this.prev=function(func){
			self._prev=func;
		}
		this.after=function(func){
			self._after=func;
		}
		if(prev){
			this._prev=prev;
		}
		if(after){
			this._after=after;
		}
	}
	exports.hook=function(obj,prop,prev,after){
	var slice=[].slice;
	//验证prop是否为有效function
	if(typeof prop!=='string'||!obj[prop]||typeof obj[prop]!=='function'){
		throw new Error('无效的属性'+prop);
	}
	//原始值
	var orig=obj[prop];
	var link=new Link(prev,after);
	function hooker(){
		var preResult;
		var oriResult;
		var args = slice.call(arguments);
		if(link._prev){
			preResult=link._prev.apply(this, args)
		}
		origResult = orig.apply(this, args);
		if(link._after){
			var tmp=link._after.apply(this, [origResult].concat(args).concat(preResult))
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
	return link;
}
}(typeof exports === "object" && exports || this));

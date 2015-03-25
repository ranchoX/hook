var assert=require('assert');
var hook=require('../lib/index').hook;
var obj={
	add:function(x,y){
		return x+y;
	},
	addlink:function(x,y){
		return x+y;
	},
	minus:function(x,y){
		return x-y;
	}
}
describe('简单使用',function(){
	it('在事件prev',function(){
		var x=3,y=4,z;
		hook(obj,'add',function(x,y){
			z=x+y;
		})
		var r=obj.add(x,y);
		assert.equal(z,r);
	})

	it('在事件after',function(){
		var x=3,y=4,z;
		hook(obj,'add',null,function(r,x,y){
			z=r;
		})
		var r=obj.add(x,y);
		assert.equal(r,z);
	})
	it('事件的前后,将after的数据返回',function(){
		var x=3,y=4,prev,after;
		hook(obj,'add',function(x,y){
			prev=x+y;
		},function(r,x,y){
			assert.equal(prev,r);
			after=r+x+y;
			return after;
		})
		assert(obj.add(x,y),after);
	})
})
describe('链式使用',function(){
	it('在事件prev',function(){
		var x=3,y=4,z;
		hook(obj,'addlink').prev(function(x,y){
			z=x+y;
		})
		var r=obj.addlink(x,y);
		assert.equal(z,r);
	})

	it('在事件after',function(){
		var x=3,y=4,z;
		hook(obj,'addlink').after(function(r,x,y){
			z=r;
		})
		var r=obj.addlink(x,y);
		assert.equal(r,z);
	})
	it('事件的前后,将after的数据返回',function(){
		var x=3,y=4,prev,after;
		hook(obj,'addlink').prev(function(x,y){
			prev=x+y;
		}).after(function(r,x,y){
			assert.equal(prev,r);
			after=r+x+y;
			return after;
		})
		assert(obj.addlink(x,y),after);
	})
})
describe('计时器')
describe('异步使用')


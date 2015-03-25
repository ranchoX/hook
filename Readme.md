#hook

Hook

###简单使用
	在浏览器
	hook(Math, "max", function() {
	  console.log("prev arguments ",[].slice.call(arguments).join(','));
	});
	console.log(Math.max(5, 6, 7))//print  prev arguments  5,6,7 \n 7

	after
	hook(Math, "max",null, function() {
	  console.log("after arguments ",[].slice.call(arguments).join(','));
	});
	console.log(Math.max(5, 6, 7))// print  after arguments  7,5,6,7, \n 7

###链式调用
	在浏览器
	hook(Math, "max").prev(function() {
	  console.log("link prev arguments ",[].slice.call(arguments).join(','));
	});
	console.log(Math.max(5, 6, 7) ) //print link prev arguments  5,6,7 \n 7;

	hook(Math, "max").after(function() {
	  console.log("link after arguments ",[].slice.call(arguments).join(','));
	});
	console.log(Math.max(5, 6, 7) ) //print link prev arguments  7,5,6,7, \n 7

###TODO
	支持异步的hook
	
	MIT
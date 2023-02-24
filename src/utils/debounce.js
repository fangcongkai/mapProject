function debounce(fn, delay){
	let timer = null;
	return function(){
		clearTimeout(timer);
		timer = setTimeout(()=> {
			fn.apply(this, arguments);
		}, delay)
	}
}
//导出
export default {
    debounce,
}
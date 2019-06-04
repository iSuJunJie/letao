/**
 * Created by Campbell on 2019/6/3.
 */
//入口函数

$(function(){

    //功能1：手动初始化图片轮播模块
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});
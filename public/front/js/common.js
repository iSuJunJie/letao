/**
 * Created by Campbell on 2019/6/3.
 */
//入口函数
$(function(){

    //功能1：初始化区域滚动模块
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });



    //功能1：手动初始化图片轮播模块
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });




});





//获取地址栏中的关键字
function getSearchKey(){

    //获取到已编码的关键字
    var encodeKey = location.search;

    //解码  ?key=耐克
    var key = decodeURI(encodeKey);

    //将？号截取掉   key=耐克
    key = key.slice(1);


    var arr = key.split('=');


    return arr[1];


};


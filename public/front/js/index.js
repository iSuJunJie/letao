/**
 * Created by Campbell on 2019/6/3.
 */
//入口函数

$(function(){

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
});
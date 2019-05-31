/**
 * Created by SuJunJie on 2019/5/31.
 */
//入口函数
$(function(){


//功能1、进度条开启和关闭
    progressBar();
    function progressBar(){
        //进度条开启
        $(document).on("ajaxStart",function(){
            NProgress.start();
        });

        //进度条结束

        $(document).on("ajaxStop",function(){
            setTimeout(function(){
                NProgress.done();
            },500);
        });
    }































































});
/**
 * Created by SuJunJie on 2019/5/31.
 */
//入口函数
$(function(){


    //全局功能、进度条开启和关闭
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



    //全局功能、登录拦截功能
    if ( location.href.indexOf("login.html") === -1 ) {
        // 地址栏中没有 login.html, 说明不是登录页, 需要进行登录拦截
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function( info ){
                if( info.success ){
                    //用户已登录 什么都不做
                }

                if(info.error === 400){
                    //用户未登录 拦截到登录页
                    location.href = "login.html";
                }
            }
        });


    }



    //功能1：点击分类管理 二级分类列表sildeDown()

    $(".nav .categroy").on("click",function(){

        $(".nav .secondNav").stop().slideToggle();
    });




    //功能2：点击菜单按钮 隐藏侧边栏

    $(".lt-content .topbar .menu").on("click",function(){

        $(".lt-aside").toggleClass("hide-aside");
        $(".lt-content").toggleClass("hide-aside");
        $(".lt-content .topbar").toggleClass("hide-aside");

    });




    //功能3：退出功能
    $("#btn-logout").on("click",function(){

        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function( info ){
                //console.log("请求成功");
                //console.log(info);

                if( info.success ){
                    location.href = "login.html";
                }


            }

        });

    });































































});
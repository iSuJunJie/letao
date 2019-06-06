/**
 * Created by Campbell on 2019/6/6.
 */


$(function(){
   //登录页的逻辑就是 已进入页面就发送请求用户数据

    //用户已经登录  返回用数据对象 进行数据渲染



    //用户未登录 直接跳转到登录页面即可




    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        dataType:'json',
        success:function( info ){

            //console.log(info);

            if( info.error === 400 ){
                location.href = "login.html";
            }



                //使用数据模板渲染数据

                var htmlStr = template("userTpl",info);

                $("#userInfo").html(htmlStr);







        }







    });






    //退出登录功能
    $("#btn-logout").on("tap",function(){



        $.ajax({
            type:'get',
            url:'/user/logout',
            dataType:'json',
            success: function( info ){
                //console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    });








});
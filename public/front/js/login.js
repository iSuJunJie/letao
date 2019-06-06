/**
 * Created by Campbell on 2019/6/6.
 */

$(function(){



    //登录页面的逻辑很简单

    //前端只需要获取 用户名 和 密码 发送请求传给后台  根据后台返回的状态做处理即可。


    //后台 拿到前端传过来的 用户名 和 密码 去匹配数据库 成功者创建sessionID 并且设置在响应头中，浏览器会自动创建cookie,返回相应的状态码
     //不成功则返回相应状态码


    // 给登录按钮绑定 tap事件
    $("#btn-login").on("tap",function(){

        var userName = $("#userName").val();

        var passWord = $("#passWord").val();


        //简单做个非空校验

        if( userName ==="" ||  passWord ===""){
            mui.toast('请输入用户名或密码',{ duration:'long', type:'div' });
            return;
        }

        //console.log(userName);
        //console.log(passWord);

        //用户名和密码都不为空 发送登录请求

        $.ajax({

            type:'post',
            url:'/user/login',
            data:{
                username:userName,
                password:passWord
            },
            dataType:'json',
            success:function( info ){

                console.log(info);


                //两种情况
                //1、登录不成功
                if( info.error === 403){
                    mui.toast('用户名或密码错误',{ duration:'long', type:'div' });
                    return;
                }



                //2、登录成功


                if( info.success ){

                    //1、从商品详情页 跳过来的  登录成功后跳转回去
                    if(location.search.indexOf("returnURL") > -1){

                        var str = location.search;
                        str = str.slice(1);
                        str = str.replace("returnURL=","");


                        location.href = str;


                    }else{

                        //2、直接登录的  跳转到用户中心页
                        location.href = "user.html";


                    }


                }



            }

        });


    });






































































});
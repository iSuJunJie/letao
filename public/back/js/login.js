
//入口函数
$(function(){

//功能1、对登录表单进行基本的校验
/*
  校验规则：

 1. 用户名不能为空
 2. 用户密码不能为空
 3. 用户密码长度为6-12位
 */
    $("#lt-login-form").bootstrapValidator({

        //配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //指定字段
        fields:{
            username:{
                //指定字段的校验规则
                validators:{
                    //非空校验
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名错误"
                    }
                }
            },
            password:{
                //指定字段的校验规则
                validators:{
                    //非空校验
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
                    },
                    callback:{
                        message:"密码错误"
                    }

                }

            }
        }
    });



//统一获取 表单校验实例
var validator = $("#lt-login-form").data("bootstrapValidator");
//功能2、登陆功能
    /*

    因为bootstrap表单组件里，默认是用表单提交的方式，所以在表单校验成功 点击登陆按钮后会会默认按照表单
    方式进行提交，并且页面会发生跳转，我们实际需要进行ajax异步请求进行提交。

    所以我们给表单绑定一个校验完成事件，使用ajax提交

     */

    $("#lt-login-form").on("success.form.bv",function(e){
        //阻止浏览器默认提交
        e.preventDefault();

        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$(this).serialize(),
            dataType:"json",
            success:function( info ){
                //console.log(info);
                //登录成功 跳转到首页
                if( info.success ){
                    location.href = "index.html";
                }


                //登录失败 进行提示
                // 用户名错误
                if( info.error === 1000){

                    validator.updateStatus("username","INVALID","callback");


                }

                // 密码错误
                if( info.error === 1001){
                    validator.updateStatus("password","INVALID","callback");
                }



            }
        });

    });




//功能3、重置功能

    /*给重置按钮绑定一个点击事件 调用插件的重置方法*/

    $("button[type=reset]").on("click",function(){
        //console.log("事件绑定成功");
        validator.resetForm();
    });











































});
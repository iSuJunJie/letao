
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
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
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
                    }

                }

            }
        }
    });





















































});
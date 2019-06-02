/**
 * Created by Campbell on 2019/6/1.
 */

//入口函数
$(function(){


    var currentPage = 1;//定义当前页变量默认为第一页
    //功能1：渲染一级分类表格  && 功能2：渲染一级分类分页插件
    render();
    function render(){

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:5
            },
            dataType:'json',
            success:function( info ){

                //console.log(info);
                //使用模板引擎渲染数据
                var htmlStr = template("firstCateTpl",info);

                $("tbody").html(htmlStr);



                //功能2：渲染一级分类分页插件
                $(".firstCatePagenator ul").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total / info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //console.log(page);

                        //当我们点击分页上的按钮时 表格根据页数重新渲染
                        currentPage = page;

                        render();
                    }
                });
            }
        });

    };




    //功能2：初始化表单校验插件
    $(".form-addFirstCate").bootstrapValidator({


        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {

            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }

                }
            }
        }

    });




    //功能3：添加一级分类功能

    /*因为该插件需要在表单提交后进行表单校验，所以表单在校验完成后会发送同步请求完成添加分类功能，而且页面会自动跳转
    *
    * 所以我们要监听表单校验成功事件，阻止表单的默认的提交行为，发送异步的ajax请求进行分类的添加
    *
    *
    * */

    $(".form-addFirstCate").on("success.form.bv",function(e){
        //阻止表单的默认行为
        e.preventDefault();

        //发送ajax请求进行 添加一级分类
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$(this).serialize(),
            dataType:'json',
            success:function( info ){
                //console.log(info);
                //如果添加成功 1、关闭模态框 2、重新渲染表格 3、重置表单校验状态 和表单内容
                if( info.success ){

                    $("#myModal").modal("hide");

                    render();

                    $(this).data("bootstrapValidator").resetForm(true);
                }

            }

        });



    });








































});

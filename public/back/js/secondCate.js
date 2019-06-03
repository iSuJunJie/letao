/**
 * Created by Campbell on 2019/6/1.
 */
//入口函数
$(function(){

var currentPage = 1;//定义当前页全局变量 默认为第一页
//功能1：渲染二级分类表格 功能2：初始化分页插件
    render();
    function render(){


        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:5
            },
            success:function( info ){
                //console.log(info);
                //使用模板引擎进行数据渲染

                var htmlStr = template("secondCateTpl",info );

                $("tbody").html(htmlStr);


                //功能2：初始化二级分类分页插件
                $(".secondCatePagenator ul").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值

                        currentPage = page;
                        render();
                    }
                });
            }

        });
    };





//功能2：初始化表单校验插件
    //使用表单校验插件
    $(".form-addSecondCate").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],
        //这样隐藏域表单可以被校验
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {

            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }

    });





//功能3：在点击添加分类按钮时 初始化一级分类下拉框数据
    $(".addSecondCate").on("click",function(){

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:50
            },
            dataType:'json',
            success:function( info ){
                console.log(info);

                //动态渲染下拉框一级分类数据
                var htmlStr = template("firstCateDropTpl",info);
                $(".dropdown-menu").html(htmlStr);
            }
        });



    });


//功能4：显示下拉框选中的项，并且把id赋值给表单 给每个li绑定委托事件
    $(".dropdown-menu").on("click","a",function(){
        //console.log("事件绑定成功！");
        //console.log($(this).text());

        $(".btn-dropList").html($(this).text()+'<span class="caret"></span>');

        $("input[name=categoryId]").val($(this).data("id"));
        //console.log($("input[name=categoryId]").val());


        //重置校验状态
        $(".form-addSecondCate").data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });



//功能5：上传图片并返回图片地址实现实时预览

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            //console.log(data);
            //console.log(data.result.picAddr);

            $(".form-addSecondCate img").attr("src",data.result.picAddr);
            $("input[name=brandLogo]").val(data.result.picAddr);
            console.log($("input[name=brandLogo]").val());


            //重置表单校验规则
            //重置校验状态
            $(".form-addSecondCate").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });




//功能6：实现二级分类上传

    $(".form-addSecondCate").on("success.form.bv",function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$(this).serialize(),
            dataType:'json',
            success:function( info ){
                if( info.success ){
                    //1、关闭模态框
                    $("#myModal").modal("hide");

                    //2、重新渲染二级分类表格
                    currentPage =1;
                    render();

                    //3、重置模态框表单
                    $(".form-addSecondCate").data("bootstrapValidator").resetForm(true);
                    //重置非表单元素
                    $(".btn-dropList").html("请选择一级分类");
                    $(".form-addSecondCate img").attr("src","images/none.png");
                }
            }
        });
    });















































});
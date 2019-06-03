/**
 * Created by Campbell on 2019/6/1.
 */
//入口函数
$(function(){

    var currentPage = 1;

    //功能1：渲染商品表格 初始化分页插件
    render();
    function render(){

        $.ajax({
           type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:5
            },
            dataType:'json',
            success:function( info ){
                //console.log(info);

                //使用模板引擎进行数据渲染
                var htmlStr = template("productTableTpl",info);

                $("tbody").html(htmlStr);



                //功能2
                //初始化分页插件

                $(".productPagenator ul").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total / info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large

                    //useBootstrapTooltip:true,
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值(第几页)
                        //console.log("点击了第"+ page +"页");

                        //当点击分页上的页数的时候 进行重新渲染 所以上面ajax里的page不是写死的
                        //提取成全局变量
                        // 当点击的页数 赋值给 当前页全局变量
                        currentPage  = page;

                        //重新渲染用户表格
                        render();
                    }
                });
            }
        });
    };




    //功能2：动态渲染模态框下来菜单二级分类列表数据
    $(".btn-addProduct").on("click",function(){

        $.ajax({
           type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function( info ){
                //console.log(info);
                //使用模板引擎动态渲染下拉框列表
                var htmlStr = template("dropListTpl",info );

                $("ul.dropdown-menu").html(htmlStr);
            }
        });
    });



    //功能3：设置选择后下拉框组件的值 并将二级分类id赋值给隐藏域
    $("ul.dropdown-menu").on("click","a",function(){

        $("ul.dropdown-menu").prev().html($(this).html()+'<span class="caret"></span>');

        $("input[name=brandId]").val($(this).data("id"));

        //手动重置校验状态
        $(".form-addProduct").data("bootstrapValidator").updateStatus("brandId", "VALID");

    });


    var picArray = [];//用户存放图片信息

    //功能4：多文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            //console.log(data.result);  定义一个数组将返回的图片信息存储到数组中
            picArray.unshift(data.result);
            //console.log(picArray);

            // 通过判断数组长度, 如果数组长度大于 3, 将数组最后一项移除
            if ( picArray.length > 5 ) {
                // 移除数组的最后一项
                picArray.pop();

            }


            //成功上传商品图片后 将图片地址设置给下面展示用的img标签

            picArray.forEach(function(item,index){
                $(".form-group img").eq(index).attr("src",item.picAddr);
            });







            //成功上传图片后 手动重置对应表单的校验状态
            //手动重置校验状态
            //对于图片 要求必须上传五张图片才能校验通过 判断数组的长度即可
            if(picArray.length === 5){
                $(".form-addProduct").data("bootstrapValidator").updateStatus("imgStatu", "VALID");
            }


        }
    });




    //功能5：表单校验
    //使用表单校验插件 进行表单校验
    //非表单校验元素进行手动重置校验状态
    $(".form-addProduct").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)']
        //这里我们置空，这样可以校验隐藏域表单
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {

            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    }

                }
            },


            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    }

                }
            },

            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    }

                }
            },

            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'

                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }

                }
            },

            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码必须是 xx-xx 的格式, 例如: 32-40'
                    }

                }
            },

            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品原价'
                    }

                }
            },

            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品价格'
                    }

                }
            },

            imgStatu:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传最多5张商品图片'
                    }

                }
            }
        }

    });




    //功能6：添加商品
    //使用表单默认提交方式 阻止表单默认提交，使用ajax提交
    $(".form-addProduct").on("success.form.bv",function(e){
        e.preventDefault();


       var dataStr = $(this).serialize() +
           "&picName1="+picArray[0].picName+"&picAddr1="+picArray[0].picAddr +
           "&picName2="+picArray[1].picName+"&picAddr2="+picArray[1].picAddr +
           "&picName3="+picArray[2].picName+"&picAddr3="+picArray[2].picAddr +
           "&picName4="+picArray[3].picName+"&picAddr4="+picArray[3].picAddr +
           "&picName5="+picArray[4].picName+"&picAddr5="+picArray[4].picAddr ;

        //console.log(dataStr);

        $.ajax({
           type:'post',
            url:'/product/addProduct',
            data:dataStr,
            dataType:'json',
            success:function( info ){
                //console.log(info);

                if( info.success ){
                    //1、关闭模态框
                    $("#myModal").modal("hide");

                    //2、重新渲染商品表格
                    currentPage = 1;
                    render();

                    //3、重置表单 所有表单的校验状态和值都被重置
                    $(".form-addProduct").data("bootstrapValidator").resetForm(true);
                    //4、手动重置 下拉框 和 展示的图片标签
                    $(".btn.btn-default.dropdown-toggle").html('请选择二级分类 <span class="caret"></span>');

                    $(".form-group img").attr("src","images/none.png");


                }
            }

        });
    });
























































});
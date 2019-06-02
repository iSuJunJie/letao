/**
 * Created by Campbell on 2019/6/1.
 */
//入口函数
$(function(){
    var currentPage = 1;  //定义当前页变量 默认是第一页

    //功能1、功能2；渲染用户表格、初始化分页插件
    render();
    function render(){

        $.ajax({

            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:5

            },
            dataType:'json',
            success:function( info ){

                //console.log( info );
                //使用模板引擎渲染用户表格数据
                var htmlStr = template("userTpl",info);
                $("#userTable tbody").html(htmlStr);


                //初始化分页插件
                //功能2：分页插件初始化
                $(".userPagenator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total / info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
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




    //功能3：用户状态禁用或启用设置

    //获取用户id 和状态码
    var userID = 0;
    var userState = 0;
    //给状态按钮绑定委托事件
    $("tbody").on("click",".btn-state",function(){

        //console.log("事件绑定成功");

        userID = $(this).parent().data("userid");
        userState = $(this).parent().data("userstate");

        //console.log(userID);
        //console.log(userState);


    });






    //当点击模态框确定按钮时 根据获取到的 用户id 和状态码  更新用户状态
    $("#btn-isDelete").on("click",function(){

        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:userID,
                isDelete:userState===1?0:1
            },
            dataType:'json',
            success:function( info ){
                //console.log(info);

                //如果请求成功 1、模态框关闭 2、重新渲染用户表格
                if( info.success ){

                    $('#myModal').modal('hide');
                    render();
                }
            }

        });

    });






















































});
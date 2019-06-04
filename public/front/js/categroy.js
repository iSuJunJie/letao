/**
 * Created by Campbell on 2019/6/4.
 */
//入口函数

$(function(){


    //功能1：动态渲染一级分类列表
    renderTopCategory();
    function renderTopCategory(){

        $.ajax({
           type:'get',
            url:'/category/queryTopCategory',
            dataType:'json',
            success:function( info ){
                //console.log(info);

                //使用模板引擎动态渲染一级分类列表
                var htmlStr = template("leftTpl",info);

                $(".left ul").html(htmlStr);

                //渲染一级列表同时默认渲染第一个对应的二级分类列表
                renderSecondCategory(info.rows[0].id);

            }


        });
    };



    //功能2：点击一级分类列表渲 根据id渲染对应的二级分类列表
    $(".left ul").on("click","a",function(){
        var id = $(this).data("id");
        renderSecondCategory(id);
    });



    //功能：根据对应一级分类ID渲染二级分类

    function renderSecondCategory( id ){

        $.ajax({
           type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            dataType:'json',
            success:function( info ){
                //console.log(info);

                //使用模板引擎渲染
                var htmlStr = template("rightTpl", info );

                $(".right ul").html(htmlStr);
            }

        });


    };































































});
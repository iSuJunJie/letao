/**
 * Created by Campbell on 2019/6/6.
 */
$(function(){


//功能1:渲染购物车列表


    function render(){

        $.ajax({
           type:'get',
            url:'/cart/queryCart',
            dataType:'json',
            success:function( info ){
                console.log(info);

                //用户未登录 不允许查看购物车 直接跳转到登录页面
                if(info.error == 400){
                    location.href = "login.html";

                }

                //用户已经登录则成功返回数据

                var htmlStr = template("cartTpl",{arr:info});

                $("#OA_task_2").html(htmlStr);



                //渲染完成以后 结束下来刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
            }
        });
    };





//配置下拉刷新

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {

                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback :function(){
                    //console.log("下拉刷新了");


                    setTimeout(function(){
                        render();
                    },400);
                }
            }
        }
    });






//删除功能
//MUI框架，默认禁止掉了 a标点的 点击事件，因为该框架认为 a标签的点击事件有300毫秒左右的延迟 在移动端是很受影响的
//所以我们 用 tap事件代替

$("#OA_task_2").on("tap","#btn-del",function(){

    //console.log("事件绑定成功");

    var id = $(this).data("id");

    $.ajax({
       type:'get',
        url:'/cart/deleteCart',
        data:{
            id:[id]
        },
        dataType:'json',
        success:function( info ){
            //console.log(info);

            if( info.success ){
                //删除成功重新渲染页面
                mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
        }


    });


});








//给模态框中的 span绑定点击事件  这个委托事件应该绑再body身上，

$("body").on("tap",".edit-productSize span",function(){
    //console.log("事件绑定成功！");

    $(this).addClass("current").siblings().removeClass("current");
});




//编辑功能
$("#OA_task_2").on("tap","#btn-edit",function(){



    //console.log("事件绑定成功");

    var obj = this.dataset;
    console.log(obj);

    var htmlStr = template("editTpl",obj);


    //消除MUI框架中 自带的换行符
    htmlStr = htmlStr.replace(/\n/g,"");


    //MUI框架 消息框中可以识别html标签  所以我们可以用模板引擎渲染的方向在里面写页面结构
    mui.confirm(htmlStr,"修改商品信息",["取消","确认"],function(e){


        //用户点击确认 提交请求进行修改
        //获取 id  数量 尺码
        if(e.index === 1){
            var id = obj.id;
            var size = $(".edit-productSize span.current").text();
            var num  = $(".mui-numbox-input").val();

            //console.log(id);
            //console.log(size);
            //console.log(num);

            $.ajax({
                type:'post',
                url:'/cart/updateCart',
                data:{
                    id:id,
                    size:size,
                    num:num
                },
                dataType:'json',
                success:function( info ){
                    //console.log(info);

                    if( info.success ){
                        //修改成功重新渲染页面
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                }


            });

        }



    });


    //先手动初始化 数字按钮
    mui(".mui-numbox").numbox();





});

































});
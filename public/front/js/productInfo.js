/**
 * Created by Campbell on 2019/6/6.
 */

$(function(){





    //1、先获取 商品id
    var id = getSearchKey();

    //console.log(id);


    //2、渲染商品详情页
    render();
    function render(){

        $.ajax({
           type:'GET',
            url:'/product/queryProductDetail',
            data:{
                id:id
            },
            dataType:'json',
            success:function( info ){
                console.log(info);

                //使用模板引擎进行渲染

                var htmlStr = template("proInfoTpl",info);

                $(".lt-main .mui-scroll").html(htmlStr);



                //手动初始化数字输入框
                mui(".lt-main .mui-numbox").numbox();

                //手动初始化图片轮播模块
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
                });

            }

        });

    };



    //3、给尺码绑定点击事件  因为尺码结构都是动态生成的，所以我们给他绑定委托事件 这里我们用 tap事件

    $(".lt-main").on("tap",".lt-main .productSize span",function(){

        $(this).addClass("current").siblings().removeClass("current");


    });






    //4、加入购物车功能实现   根据接口文档需要
    /*
    * 获取商品 id
    * 获取商品尺码
    * 获取商品数量
    * 传给后台
    *
    * */


    $("#btn-addCart").on("tap",function(){

        //获取商品id  全局已经获取过了
        //获取商品尺码
        var size = $(".productSize span.current").text();

        if( !size ){
            mui.toast('请选择尺码',{ duration:'long', type:'div' });
            return;
        }




        //获取商品数量
        var num = $(".mui-numbox-input").val();


        //发送请求
        $.ajax({

            type:'post',
            url:'/cart/addCart',
            data:{
                productId:id,
                num:num,
                size:size
            },
            dataType:'json',
            success:function( info ){
                //console.log(info);


                //如果未登录的情况
                // 直接拦截到登录页  由于登录完成后要直接调回该商品页面继续添加 所以我们 将商品的地址作为参数传到 登录页即可
                if( info.error === 400){


                    location.href  =  "login.html?returnURL="+ location.href;

                }


                //如果登录的情况
                //弹出一个弹窗  去购物车 还是继续浏览
                if( info.success ){

                    mui.confirm("该商品已添加到购物车","温馨提示",["去购物车","继续浏览"],function(e){

                        if(e.index == 0){

                            location.href = "cart.html";


                        }

                    });

                }




            }




        });




    });


































































});
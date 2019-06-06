/**
 * Created by Campbell on 2019/6/5.
 */
$(function(){




//功能1：根据关键字进行商品列表基本渲染
    $(".search input").val(getSearchKey());

    render();



//功能2：点击搜索按钮 根据搜索关键字再次渲染搜索列表页

    $(".btn-search").on("click",function(){

        var key = $(this).prev().val();

        //非空判断
        if( key === ""){
            mui.toast('请输入商品名称',{ duration:'long', type:'div' });
            return;
        }


        render();


        //还需要将 最新的搜索关键字存储到本地存储空间中
        var str = localStorage.getItem("searchkeys");

        var arr = JSON.parse(str);

        //判断数组中是否存在该关键字
        var i  = arr.indexOf(key);

        if( i != -1 ){
            arr.splice(i, 1);
        }

        arr.unshift(key);

        if(arr.length >=11 ){
            arr.pop();
        }



        //数组处理好以后转成JSon串 再次存到本地存储空间中
        var str1 = JSON.stringify(arr);

        localStorage.setItem("searchkeys",str1);



    });










//功能3:点击排序按钮 添加高亮类并且其他兄弟移出高亮类
    //给箭头切换类


    $(".sort a").on("click",function(){

        if ( $(this).hasClass("current") ) {
            // 切换箭头方向
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }
        else {
            // 没有 current, 给自己加上, 并排他
            $(this).addClass("current").siblings().removeClass("current");
        }

        render();


    });











//功能4：给每个商品都绑定点击事件  移动端 点击事件最好换成tap事件
    //mui框架 默认禁止a标签的点击事件

    $(".productList ul").on("tap","a",function(){

       //点击某个商品 跳转到商品详情页
       //商品详情页渲染需要知道是哪个商品，所以跳过去的时候 去要把商品id带过去

       //采用地址跳转的方法


        //注意一点，自定义属性名不能出现大写字母，即使你大写了，浏览器也会把你变成小写。

        location.href = "productInfo.html?proId="+$(this).data("id");

    });






















































    function render(){

        //排序问题  先不写
        /*
        * 商品列表是否需要排序 根据 是否有 current类来判断
        *
        *
        * 升序还是降序  根据 图标的 类名来判断

        *
        * */
        var params = {};
        // 1. 必传的 3 个参数
        params.proName = $(".search input").val();
        params.page = 1;
        params.pageSize = 50;

        // 2. 两个可传可不传的参数
        //    (1) 通过判断有没有高亮元素, 决定是否需要排序
        //    (2) 通过箭头方向判断, 升序还是降序  1升序，2降序
        var $current = $(".sort a.current");

         console.dir($current);
        if ( $current.length > 0 ) {
            // 有高亮的, 需要进行排序
            var sortName = $current.data("sorttype");

            console.log(sortName);
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 1 : 2;

            console.log(sortValue);
            params[ sortName ] = sortValue;
        }





        //发送AJAX请求对应商品信息
        $.ajax({

            type: 'get',
            url: '/product/queryProduct',
            data: params,
            dataType: 'json',
            success: function (info) {

                //console.log(info);

                //使用模板引擎进行渲染
                var htmlStr = template("proTpl", info);

                $(".productList ul").html(htmlStr);

            }
        });

    };







});
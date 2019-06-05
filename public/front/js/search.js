/**
 * Created by Campbell on 2019/6/4.
 */
$(function(){







    ////功能1：动态渲染搜索历史记录列表
        //存假数据
        //var arr = ["耐克","阿迪","安踏","匡威","万斯","花花公子","百丽","卡特"];
        //var arr1 = JSON.stringify(arr);
        //
        //
        //localStorage.setItem("searchkeys",arr1);
    renderHistoryList();
    function renderHistoryList(){

        //获取数据对象
        var arr = getSearchHistoryKey("searchkeys") || [];

        //根据模板引擎进行数据渲染
        var htmlStr = template("historyTpl",{ arr:arr });

        $(".history").html(htmlStr);
    };



    //功能2：点击搜索按钮 将搜索关键字动态添加到历史记录列表里和本地存储空间中
    $(".btn-search").on("click",function(){




        //1、获取输入框中的关键字
        var key = $(this).prev().val();
        if( key === ""){
            mui.toast('请输入搜索关键字',{ duration:'long', type:'div' });
            return;

        }
        //重置搜索框
        $(this).prev().val("");


        //带着关键字跳转到搜索列表页进行商品渲染.......................................






        //2、获取本地存储历史记录信息 更新数组  重新存储到存储空间中
        //如果本地存储空间没有存储任何信息 那么给一个空数组重新存一下即可
        var arr = getSearchHistoryKey("searchkeys") || [];


        //对key进行判断  防止重复

        var i = arr.indexOf(key);
        if( i != -1){
            //有重复项 那么先删除已经存在的重复项
           arr.splice(i,1);
        }

        //删除已经存在的 再重新添加搜索关键字
        arr.unshift(key);






        //在这里对数组进行一个判断，设置数组长度 10 最多保留10个历史记录
        if(arr.length >= 11 ){
            //删除最后一下
            arr.pop();
        }

        var str = JSON.stringify(arr);

        localStorage.setItem("searchkeys",str);


        //3、重新渲染历史记录列表
        renderHistoryList();


    });




    //功能3：清空历史记录
    //点击清空搜索记录图标，将本地存储空间中的对应历史记录数据移出 然后重新渲染页面列表
    $(".history").on("click",".btn-clearList",function(){


        mui.confirm( "你确定要清空历史记录吗？", "温馨提示", ["取消","确认"], function(e){

            if( e.index === 1){

                localStorage.removeItem("searchkeys");

                renderHistoryList();
            }

        });


    });




    //功能4、删除某一项历史记录
    //点击删除图标，将对应索引的每一项在数组中删除，然后重新转化成字符串，转存到存储空间中，然后重新渲染列表即可
    //索引怎么得到，要在渲染列表是存到自定义属性中  注意要绑定委托事件

    $(".history").on("click","i",function(){
        var that = this;

        mui.confirm( "你确定要删除该条历史记录吗？", "温馨提示", ["取消","确认"], function(e){

            //点击了确认按钮
            if( e.index === 1){
                //可以删除说明本地存储空间中有值 能获取到
                //获取数据对象
                var arr = getSearchHistoryKey("searchkeys");

                //数组splice方法运用
                var index = $(that).data("index");


                arr.splice(index, 1);



                var str = JSON.stringify(arr);

                localStorage.setItem("searchkeys",str);


                //重新渲染历史记录列表

                renderHistoryList();
            }

        });


    });
































































    //获取获取本地存储的搜索历史记录关键字
    function getSearchHistoryKey(key){

        var str = localStorage.getItem(key);
        var arrKey = JSON.parse(str);



        return arrKey;
    };

});
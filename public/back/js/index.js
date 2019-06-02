/**
 * Created by Campbell on 2019/6/1.
 */

//入口函数
$(function(){


//功能1、数据报表初始化

    initEcharts();
    function initEcharts(){

        // 基于准备好的dom，初始化echarts实例
        var echarts1 = echarts.init(document.querySelector(".echarts1"));

        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2017年注册人数'
            },
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        echarts1.setOption(option1);







       // 基于准备好的dom，初始化echarts实例

       var echarts2 = echarts.init(document.querySelector(".echarts2"));

       var option2 = {
            title : {
                text: '热门品牌销售',
                subtext: '2017年6月',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['耐克','阿迪','万斯','安踏','李宁']
            },
            series : [
                {
                    name: '品牌',
                    type: 'pie',
                    radius : '60%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'耐克'},
                        {value:310, name:'阿迪'},
                        {value:234, name:'万斯'},
                        {value:135, name:'安踏'},
                        {value:1548, name:'李宁'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        echarts2.setOption(option2);


    };


























































});

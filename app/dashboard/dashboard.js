(function(){

    var os = angular.module('cw.os');

    os.controller('DashboardController', ['$scope', '$log', '$http', function($scope, $log, $http){
        var vm = this;

        vm.todayWaterTotal = [];
        vm.todayGarbageTotal = [];

        // 污水站点 饼图数据对象
        vm.waterDate = {
            "type": "pie3d",
            "renderAt": "water",
            "width": "100%",
            "height": "100%",
            "dataFormat": "json",
            "dataSource": {
                chart: {
                    caption             : "目前已接入平台污水站点累计",
                    subcaption          : "今日处理总量",
                    showlabels          : "1",
                    showvalues          : "0",
                    showBorder          : "0",
                    bgAlpha             : "0",
                    shadowAlpha         : "0",
                    use3DLighting       : "1",
                    baseFontColor       : "#ffffff",
                    toolTipColor        : "#ffffff",
                    toolTipBorderThickness: "0",
                    toolTipBgColor      : "#000000",
                    toolTipBgAlpha      : "80",
                    toolTipBorderRadius : "2",
                    toolTipPadding      : "5",
                    slicingdistance     : "15",   //离开中心的距离
                    theme               : "ocean",
                    chartLeftMargin     : "0",
                    chartRightMargin    : "0",
                    chartTopMargin      : "0",
                    chartBottomMargin   : "0"

                },
                data: []
            }
        };

        // 垃圾站点 饼图
        vm.garbageDate = {
            "type": "pie3d",
            "renderAt": "garbage",
            "width": "100%",
            "height": "100%",
            "dataFormat": "json",
            "dataSource": {
                chart: {
                    caption             : "目前已接入平台垃圾站点累计",
                    subcaption          : "今日处理总量",
                    showlabels          : "1",
                    showvalues          : "0",
                    showBorder          : "0",
                    bgAlpha             : "0",
                    shadowAlpha         : "0",
                    baseFontColor       : "#ffffff",
                    use3DLighting       : "1",
                    toolTipColor        : "#ffffff",
                    toolTipBorderThickness: "0",
                    toolTipBgColor      : "#000000",
                    toolTipBgAlpha      : "80",
                    toolTipBorderRadius : "2",
                    toolTipPadding      : "5",
                    //showlegend          : "1",
                    slicingdistance     : "15",   //离开中心的距离
                    //showpercentvalues   : "0",     //1，显示百分比、0不显示百分比
                    // plottooltext        : "$label: $value",
                    theme               : "ocean",
                    chartLeftMargin     : "0",
                    chartRightMargin    : "0",
                    chartTopMargin      : "0",
                    chartBottomMargin   : "0"
                },
                data: []
            }
        };

        // 站点健康度 图表数据对象
        vm.siteHealth = {
            type: 'column3d',
            renderAt: 'healthy',
            "width": "100%",
            "height": "100%",
            dataFormat: 'json',
            dataSource:{
                "chart": {
                    "caption"     : "站点健康度",
                    "numberSuffix": "%",
                    "paletteColors": "#0075c2",
                    "bgColor": "#ffffff",
                    "bgAlpha": "0",
                    "showBorder": "0",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "canvasbgAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "placevaluesInside": "1",
                    "rotatevalues": "1",
                    // "valueFontColor": "#ffffff",
                    "showXAxisLine": "1",
                    "xAxisLineColor": "#999999",
                    "divlineColor": "#999999",
                    "divLineDashed": "1",
                    "showAlternateHGridColor": "0",

                    "toolTipColor"        : "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor"      : "#000000",
                    "toolTipBgAlpha"      : "80",
                    "toolTipBorderRadius" : "2",
                    "toolTipPadding"      : "5",

                    "labelDisplay": "WRAP",
                    // "slantLabels": "1",

                    "baseFontColor": "#fff",
                    "yAxisMinValue": "0",
                    "yAxisMaxValue": "100",

                    "chartLeftMargin"     : "0",
                    "chartRightMargin"    : "0",
                    "chartTopMargin"      : "0",
                    "chartBottomMargin"   : "0"
                },
                "data": []
            }
        };


        // 污水告警 图表统计数据对象
        vm.alarmWater = {
            type: 'bar3d',
            renderAt: 'alarmWater',
            width: '100%',
            height: '100%',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "污水告警统计",
                    "paletteColors": "#0075c2",
                    "bgColor": "#ffffff",
                    "bgAlpha": "0",
                    "canvasBgAlpha": "0",
                    "showBorder": "0",
                    // "maxLabelWidthPercent": "30",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "placeValuesInside": "1",
                    "baseFontColor": "#ffffff",
                    "showAxisLines": "1",
                    "axisLineAlpha": "25",
                    "divLineAlpha": "0",
                    "alignCaptionWithCanvas": "0",
                    "showAlternateVGridColor": "0",
                    "captionFontSize": "14",
                    "toolTipColor": "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#000000",
                    "toolTipBgAlpha": "80",
                    "toolTipBorderRadius": "2",
                    "toolTipPadding": "5",


                    "chartLeftMargin"     : "0",
                    "chartRightMargin"    : "0",
                    "chartTopMargin"      : "0",
                    "chartBottomMargin"   : "0"
                },
                "data": []

            }
        };

        // 垃圾告警 图标数据对象
        vm.alarmGarbage = {
            type: 'bar3d',
            renderAt: 'alarmGarbage',
            width: '100%',
            height: '100%',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "垃圾告警统计",
                    "paletteColors": "#0075c2",
                    "bgAlpha": "0",
                    "canvasBgAlpha": "0",
                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    "baseFontColor": "#ffffff",
                    "plotBorderAlpha": "0",
                    "plotSpacePercent" : "60",
                    "placeValuesInside": "1",
                    "valueFontColor": "#ffffff",
                    "showAxisLines": "1",
                    "axisLineAlpha": "25",
                    "divLineAlpha": "0",
                    "alignCaptionWithCanvas": "0",
                    "showAlternateVGridColor": "0",
                    "captionFontSize": "14",
                    "toolTipColor": "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#000000",
                    "toolTipBgAlpha": "80",
                    "toolTipBorderRadius": "2",
                    "toolTipPadding": "5",
                    "chartLeftMargin"     : "0",
                    "chartRightMargin"    : "0",
                    "chartTopMargin"      : "0",
                    "chartBottomMargin"   : "0"
                },
                "data": [

                ]

            }
        };

        // var toGetData = function() {
        //     // 饼图， 系统当日处理量
        //     $http.get('/api/v1/dashboard/disposes').success(
        //         function(response){
        //             vm.data = response.data;
        //             vm.waterSiteCount = 0;
        //             vm.garbageSiteCount = 0;
        //             vm.allWaterTotal = 0;
        //             vm.allGarbageTotal = 0;
        //             angular.forEach(vm.data.water, function (item, index) {
        //                 vm.waterSiteCount += item.siteCount;
        //                 vm.allWaterTotal += item.total;
        //                 var personAvg = 0;
        //                 if(item.population){
        //                     personAvg=(item.total/item.population).toFixed(2);
        //                 }
        //                 vm.todayWaterTotal.push(
        //                     {
        //                         townName  : item.townName,
        //                         todayTotal: item.total?item.total:0,
        //                         personAvg : personAvg
        //                     }
        //                 );


        //                 vm.waterDate.dataSource.data.push(
        //                     {
        //                         label    : item.townName,
        //                         value    : item.siteCount,
        //                         toolText : '乡镇名：'+item.townName+'{br}'+
        //                         '站点数：'+item.siteCount+'{br}'+
        //                         '今日处理量：'+(item.total?item.total:0)+'M³{br}'+
        //                         '户数：'+(item.household?item.household:0)+'{br}'+
        //                         '人口数：'+(item.population?item.population:0)+'{br}'+
        //                         '人均：'+personAvg+"M³"
        //                     }
        //                 );
        //             });


        //             angular.forEach(vm.data.garbage, function (item, index) {
        //                 vm.garbageSiteCount += item.siteCount;
        //                 vm.allGarbageTotal += item.total;
        //                 vm.todayGarbageTotal.push(
        //                     {
        //                         townName  : item.townName,
        //                         todayTotal: item.total?item.total:0,
        //                         personAvg : (item.total/item.population).toFixed(2)
        //                     }
        //                 );
        //                 vm.garbageDate.dataSource.data.push(
        //                     {
        //                         label    : item.townName,
        //                         value    : item.siteCount,
        //                         toolText : '乡镇名：'+item.townName+'{br}'+
        //                         '站点数：'+item.siteCount+'{br}'+
        //                         '今日处理量：'+item.total+'Kg{br}'+
        //                         '户数：'+item.household+'{br}'+
        //                         '人口数：'+item.population+'{br}'+
        //                         '人均：'+(item.total/item.population).toFixed(2)+'Kg/人'
        //                     }
        //                 );
        //             });
        //             vm.waterDate.dataSource.chart.caption += vm.waterSiteCount+"个";
        //             vm.garbageDate.dataSource.chart.caption += vm.garbageSiteCount+"个";
        //             vm.waterDate.dataSource.chart.subcaption += vm.allWaterTotal.toFixed(2)+"kg";
        //             vm.garbageDate.dataSource.chart.subcaption += vm.allGarbageTotal.toFixed(2)+"kg";
        //             var revenueChart = new FusionCharts(vm.waterDate);
        //             revenueChart.setTransparent(true);
        //             revenueChart.render("water");
        //             // var revenueChart = new FusionCharts(vm.garbageDate);
        //             // revenueChart.setTransparent(true);
        //             // revenueChart.render("garbage");
        //         }
        //     );

        //     // 站点健康度
        //     // $http.get('/api/v1/dashboard/siteHealth').success(
        //     //     function(response) {
        //     //         angular.forEach(response.data, function(item) {
        //     //             vm.siteHealth.dataSource.data.push(
        //     //                 {
        //     //                     "label": item.townName,
        //     //                     "value": ((item.errorCount/item.totalSite)*100).toFixed(2)
        //     //                 }
        //     //             );
        //     //         });
        //     //         var revenueChart = new FusionCharts(vm.siteHealth);
        //     //         revenueChart.setTransparent(true);
        //     //         revenueChart.render("healthy");
        //     //     }
        //     // );

        //     // 告警统计
        //     // $http.get('/api/v1/dashboard/infoCount').success(
        //     //     function(response){
        //     //         vm.data = response.data;
        //     //
        //     //         angular.forEach(vm.data.water, function (item, index) {
        //     //             vm.alarmWater.dataSource.data.push(
        //     //                 {
        //     //                     label    : item.typeName,
        //     //                     value    : item.alarmCount
        //     //                 }
        //     //             );
        //     //         });
        //     //
        //     //         angular.forEach(vm.data.garbage, function (item, index) {
        //     //             vm.alarmGarbage.dataSource.data.push(
        //     //                 {
        //     //                     label    : item.typeName,
        //     //                     value    : item.alarmCount
        //     //                 }
        //     //             );
        //     //         });
        //     //
        //     //         var revenueChart = new FusionCharts(vm.alarmGarbage);
        //     //         revenueChart.setTransparent(true);
        //     //         revenueChart.render("alarmGarbage");
        //     //
        //     //         var revenueChart = new FusionCharts(vm.alarmWater);
        //     //         revenueChart.setTransparent(true);
        //     //         revenueChart.render("alarmWater");
        //     //     }
        //     // );
        // };



        vm.refresh = function () {
          //toGetData();
        };

        vm.refresh();

    }]);

})();
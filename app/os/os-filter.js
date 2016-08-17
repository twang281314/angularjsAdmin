(function(){
    var os = angular.module('cw.os');

    /*  站点类型过滤器  */
    os.filter('siteType', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "A类站点";
            }else if(input == 2){
                output = "B类站点";
            }else if(input == 3){
                output = "C类站点";
            }else if(input == 4){
                output = "污水处理站";
            }else if(input == 5){
                output = "垃圾处理站";
            }


            return output;
        };

    });

    /*  状态过滤器  */
    os.filter('EnabledTxt', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "启用";
            }else if(input == 2){
                output = "禁用";
            }

            return output;
        };

    });

    /*  告警状态过滤器  */
    os.filter('roleEnabledTxt', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "启用";
            }else if(input == 2){
                output = "禁用";
            }

            return output;
        };

    });

    /*  站点考核总评价过滤器  */
    os.filter('totalEvaluate', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "优";
            }else if(input == 2){
                output = "良";
            }else if(input == 3){
                output = "中"
            }else if(input == 4){
                output = "差"
            }

            return output;
        };

    });

    /*  告警状态过滤器  */
    os.filter('stateTxt', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "未处理";
            }else if(input == 2){
                output = "无效告警";
            }else if(input == 3){
                output = "已处理"
            }

            return output;
        };

    });
    
    /*  运维计划状态过滤器  */
    os.filter('planStateTxt', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "未执行";
            }else if(input == 2){
                output = "已执行"
            }

            return output;
        };

    });

    //告警级别过滤器
    os.filter('levelTxt', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "一级警告";
            }else if(input == 2){
                output = "二级警告";
            }else if(input == 3){
                output = "三级警告"
            }

            return output;
        };

    });

    //工单过滤器
    os.filter('orderTxt', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';

            if(input == 1){
                output = "未派发";
            }else if(input == 2){
                output = "已派发";
            }else if(input == 3){
                output = "待审核"
            }else if(input == 4){
                output = "初审未通过"
            }else if(input == 5){
                output = "初审通过"
            }else if(input == 6){
                output = "终审未通过"
            }else if(input == 7){
                output = "已处理"
            }

            return output;
        };

    });

    os.filter('orderHandle', function () {
        return function (input) {
            input = input || '';
            if (!input) return '';
            var output = '';
            if(input == 1){
                output = "派发";
            }else if(input == 2){
                output = " ";
            }else if(input == 3){
                output = "初审"
            }else if(input == 4){
                output = " "
            }else if(input == 5){
                output = "终审"
            }else if(input == 6){
                output = " "
            }else if(input == 7){
                output = " "
            }

            return output;
        };

    });
    
    /*  字段长度显示过滤器  */
    os.filter('reverse', function () {
        return function (input, capitalize_index, specified_char) {
            var input = String(input);
            input = input || '';
            var output = '';
            var customCapIndex = capitalize_index || -1;
            var specifiedChar = specified_char || '';

            if(input.length < customCapIndex){
                output = input;

            }else {
                output = input.substr(0,customCapIndex) + specifiedChar;
            }

            return output;
        };

    });
    
})();
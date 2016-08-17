(function(){
    var os = angular.module('cw.os');

    //os.directive("appController", ['$controller', '$log', function($controller, $log){
    //    return {
    //        restrict: 'A',
    //        scope: true,
    //        link: function (scope, element, attrs) {
    //            $log.log("app-controller");
    //            var locals = {};
    //            angular.extend(locals, {$scope: scope});
    //            $controller(attrs.appController, locals);
    //        }
    //    };
    //}]);

    //os.value('API', {
    //        DEFAULT: '/api/v1',
    //        V1: '/api/v1',
    //        V2: '/api/v1'
    //});



    os.factory('appManager', ['$rootScope', '$location', '$log', '$controller', function($rootScope, $location, $log, $controller) {

        var apps = [];
        apps.push({
            id: '/dashboard',
            title: '仪表盘',
            icon: 'fa fa-dashboard',
            templateLazy: 'dashboard/dashboard.html',
            sticky: true
        });

        apps.push({
            id: '/maps',
            title: '地图总览',
            icon: 'fa fa-map-marker',
            templateLazy: 'maps/maps.html',
            sticky: false
        });

        //apps.push({
        //    id: '/system',
        //    title: '系统管理',
        //    icon: 'fa fa-pagelines',
        //    templateLazy: 'system/system-list.html'
        //});

        var findApp = function (id) {
            for (var i = 0; i < apps.length; ++i) {
                if (apps[i].id == id) return apps[i];
            }
            return null;
        };

        var activateApp = function(app) {
            for (var i = 0; i < apps.length; ++i) {
                apps[i].active = false;
            }
            app.active = true;
            if (!app.templateUrl) app.templateUrl = app.templateLazy;
        };

        var closeApp = function(event, index) {
            event.preventDefault();
            event.stopPropagation();

            var app = apps[index];

            apps.splice(index, 1);

            if (app.active) {
                if (index > apps.length - 1)
                    app = apps[apps.length - 1];
                else
                    app = apps[index];
                $location.path(app.id);
            }
        };

        $rootScope.$on('$routeChangeStart', function(evt, next, current) {
            //$log.debug(next);

        });

        $rootScope.$on('$routeChangeSuccess', function(evt, current, previous) {
            var id = $location.path();
            var app = findApp(id);
            if (!app) {
                app = {
                    id: id,
                    icon: current.icon||'fa fa-circle-thin',
                    title: current.title,
                    templateUrl: current.templateUrl
                };
                apps.push(app);
            }
            activateApp(app);

            OS.activateNav(current.name, id);
        });


        var service = {
            apps: apps,
            activate: activateApp,
            close: closeApp
        };

        return service;
    }]);

    os.factory('Excel', ['$window', function($window){
        var uri      = 'data:application/vnd.ms-excel;base64,',
            template = '<!--[if gte mso 9]&gt;{worksheet}&lt;![endif]--><table>{table}</table>',
            base64   = function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format   = function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table = $(tableId),
                    ctx   = { worksheet:worksheetName,table:table.html() },
                    href  = uri+base64(format(template,ctx));
                return href;
            }
        };
    }]);
})();
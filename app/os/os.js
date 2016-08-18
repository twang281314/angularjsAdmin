(function() {
    var os = angular.module('cw.os', [
        'ngRoute',
        'ngAnimate',
        'ui.bootstrap',
        'oc.lazyLoad',
        'angularBootstrapNavTree',
        'ngJsTree',
        'ng-fusioncharts',
        'treeGrid'
    ]);



    os.config(function($animateProvider) {
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
    });

    //os.animation('.app-tab-pane', function () {
    //    return {
    //        //beforeAddClass : function(element, className, done) {
    //        //    if (className === 'ng-hide') {
    //        //        element.animate({
    //        //            opacity: 0
    //        //        },50, done);
    //        //    } else {
    //        //        done();
    //        //    }
    //        //},
    //        removeClass : function(element, className, done) {
    //            if (className === 'ng-hide') {
    //                element.css('opacity',0);
    //                element.animate({
    //                    opacity: 1
    //                }, 100, done);
    //            } else {
    //                done();
    //            }
    //        }
    //    };
    //});


    os.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
    os.factory('httpInterceptor', ['$q', '$injector', function($q, $injector) {

        var httpInterceptor = {
            'responseError': function(response) {
                if (response.status == 401) {
                    var rootScope = $injector.get('$rootScope');
                    console.log(rootScope);
                    var state = $injector.get('$rootScope').$state;
                    console.log(state);
                    // rootScope.stateBeforLogin = state;
                    // rootScope.$state.go("/dashboard");
                    alert("登入超时请登入！");
                    window.location.href = "/index/index";
                    return $q.reject(response);
                } else if (response.status === 404) {
                    alert("页面出错了，请联系管理员！");
                    //window.location.href="/index/index";
                    return $q.reject(response);
                } else if (response.status === 403) {
                    alert("您没有此权限！");
                    return $q.reject(response);
                }
            },
            'response': function(response) {
                return response;
            }
        };
        return httpInterceptor;
    }]);


    os.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        // $locationProvider.html5Mode({
        //     enabled: false
        // });

        $routeProvider.otherwise(APPS[0].url);

        angular.forEach(APPS, function(app) {
            var route = {
                id: app.url,
                icon: app.icon,
                title: app.title,
                templateUrl: app.templateUrl,
                resolve: app.resolve
            };

            if (route.resolve && route.resolve.deps) {
                var deps = route.resolve.deps;
                route.resolve.deps = ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cw.os',
                        files: deps
                    }).then(function success(args) {
                        //console.debug(args);
                        return args;
                    }, function error(err) {
                        console.error(app.id);
                        console.error(err);
                        return err;
                    });
                }];
            }

            $routeProvider.when(app.url, route);
        });

    }]);




    os.run(['$rootScope', '$route', '$routeParams', '$location', '$log', 'appManager', function($rootScope, $route, $routeParams, $location, $log, appManager) {
        $rootScope.$route = $route;
        $rootScope.$routeParams = $routeParams;
        $rootScope.appManager = appManager;

        $rootScope.$on('$includeContentLoaded', function() {
            //$log.debug('>>>> $includeContentLoaded');
            OS.initComponent();
        });

        $rootScope.$on('$routeChangeStart', function(evt, next, current) {
            //$log.debug('>>>> $routeChangeStart');
            $('.pace .pace-progress').addClass('hide');
            $('.pace').removeClass('pace-inactive');
        });

        $rootScope.$on('$routeChangeSuccess', function(evt, current, previous) {
            $log.debug('>>>> $routeChangeSuccess');
            Pace.restart();
        });

        $rootScope.$on('$routeChangeError', function() {
            $log.error('>>>> $routeChangeError');
            Pace.stop();
        });
    }]);


    os.controller('OSController', ['$scope', '$http', '$timeout', '$log', '$uibModal', function($scope, $http, $timeout, $log, $uibModal) {
        //$log.debug(">>> OSController");


        // $scope.alerts = [];
        //
        // $scope.copyAlerts = [];
        //
        // $scope.addAlert = function(msg) {
        //     $scope.alerts.push({type:'danger', msg: msg});
        // };
        //
        // $scope.closeAlert = function(index) {
        //     $scope.alerts.splice(index, 1);
        // };
        //
        // setInterval(function () {
        //     $http.get('/api/v1/dashboard/nowAlarm?time='+new Date().getTime()).success(
        //         function (response) {
        //             var data = response.data;
        //
        //             if ($scope.copyAlerts.length > 0 && data.length ) {
        //                 if ($scope.copyAlerts.length != data.length) {
        //                     $scope.alerts = [];
        //                     angular.forEach(data, function (item) {
        //                         $scope.addAlert(item);
        //                     });
        //                 }
        //             }else{
        //                 //首次
        //                 angular.forEach(data, function (item) {
        //                     $scope.addAlert(item);
        //                 });
        //                 $scope.copyAlerts = $scope.alerts;
        //             }
        //         }
        //     )
        // }, 5000);



    }]);

})();
(function(){

    var os = angular.module('cw.os');

    os.controller('SidebarController', ['$scope', '$route', '$location', '$timeout', '$http', '$log', function($scope, $route, $location, $timeout, $http, $log){
        OS.initSidebar();
        OS.activateNav($route.current.name, $location.path());

        $timeout(function(){ OS.loadCompleted(); });

        
    }]);
})();
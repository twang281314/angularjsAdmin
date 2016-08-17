(function(){
    var os = angular.module('cw.os');

    os.controller('nowAlarm', ['$scope', '$timeout', '$http', '$log', function($scope, $timeout, $http, $log){
        setInterval(function () {
            $http.get('/api/v1/dashboard/nowAlarm?time='+new Date().getTime()).success(
                function (response) {
                    $scope.nowAlarm = response.data;
                    console.log(response.data);
                    if ($scope.nowAlarm.length >= 1) {
                        $scope.newAlarmIsShow = true;
                    }else {
                        $scope.newAlarmIsShow = false;
                    }
                }
            )
        }, 3000);

        $scope.test = function () {
            alert(1);
        }

    }]);
})();
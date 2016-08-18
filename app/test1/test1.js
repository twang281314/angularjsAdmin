(function(){

    var os = angular.module('cw.os');

    os.controller('test1Controller', ['$scope', '$log', '$http', function($scope, $log, $http){
        // var vm = $scope.vm={};
        var vm = this;

        vm.username="anytao";

    }]);

})();
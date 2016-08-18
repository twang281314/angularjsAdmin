(function(){
    
    'use strict';
    var app= angular.module('MyApp');

    app.controller('1Ctrl',function($scope){
          $scope.name="1";
    });
    app.controller('2Ctrl',function($scope){
          $scope.name="2";
    });
    app.controller('3Ctrl',function($scope){
          $scope.name="3";
    });
    app.controller('4Ctrl',function($scope){
          $scope.name="4";
    });

})();
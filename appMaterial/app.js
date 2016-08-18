(function() {
    'use strict';
    angular
        .module('MyApp', ['ngMaterial'])
        .controller('AppCtrl', AppCtrl);

    function AppCtrl($scope, $log) {
        var tabs = [{
                title: 'One',
                content: "Tabs will become paginated if there isn't enough room for them.",
                templateUrl:'views/1.html'
            }, {
                title: 'Two',
                content: "You can swipe left and right on a mobile device to change tabs.",
                templateUrl:'views/2.html'
            }, {
                title: 'Three',
                content: "You can bind the selected tab via the selected attribute on the md-tabs element.",
                templateUrl:'views/3.html'
            }],
            selected = null,
            previous = null;
        $scope.tabs = tabs;
        $scope.selectedIndex = 2;
        $scope.$watch('selectedIndex', function(current, old) {
            previous = selected;
            selected = tabs[current];
            if (old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
            if (current + 1) $log.debug('Hello ' + selected.title + '!');
        });
        $scope.addTab = function(title, view,templateUrl) {
            view = view || title + " Content View";
            tabs.push({
                title: title,
                content: view,
                templateUrl:templateUrl,
                disabled: false
            });
        };
        $scope.removeTab = function(tab) {
            var index = tabs.indexOf(tab);
            tabs.splice(index, 1);
        };
    }
})();



/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
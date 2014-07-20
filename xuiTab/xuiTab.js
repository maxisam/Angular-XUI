/**
 * Created by linsz on 7/18/14.
 */

angular.module('xui.tab', ['ui.bootstrap.dropdown'])
    .controller('xuiTabCtrl', ['$scope', '$location',
        function ($scope, $location) {
            $scope.IsActive = function (tab) {
                if ($location.path().indexOf(tab.URL) > 0) {
                    $scope.CurrentTab = tab;
                    return true;
                }
                return false;
            };
        }
    ])
    .directive('xuiTab', [
        function () {
            return {
                restrict: 'EA',
                scope: {
                    tabMenu: "="
                },
                templateUrl: '../xuiTab.html',
                controller: 'xuiTabCtrl'
            };
        }
    ]);
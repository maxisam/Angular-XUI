/**
 * Created by linsz on 7/18/14.
 */
var app = angular.module('plunker', ['xui.tab']);

app.constant('TabMenu', [
    {
        title: 'Open',
        URL: 'Open'
    },
    {
        title: 'Create',
        URL: 'Create'
    }
]);
app.controller('MainCtrl', function ($scope, TabMenu) {
    $scope.name = 'World';
    $scope.TabMenu = TabMenu;

});


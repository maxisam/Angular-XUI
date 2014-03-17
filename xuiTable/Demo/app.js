var app = angular.module('plunker', ['xui.table']);

app.constant('TableHeader', [{
    header: 'id',
    title: 'id',
    sortable: true
}, {
    header: 'name',
    title: 'name',
    sortable: true
}, {
    header: 'description',
    title: 'description',
    sortable: true
}, {
    header: 'field3',
    title: 'field3',
    sortable: true
}, {
    header: 'Action',
    title: 'Action',
    sortable: false
}

]);
app.controller('MainCtrl', function($scope, TableHeader) {
    $scope.name = 'World';
    $scope.TableHeader = TableHeader;
    $scope.List = [];
    for (var i = 1; i < 65; i++) {
        $scope.List.push({
            "id": "0" + i,
            "name": "name " + i,
            "description": "description " + i,
            "field3": "field3 " + i,
            "field4": "field4 " + i,
            "field5 ": "field5 " + i
        });
    }
    $scope.search = {};

    $scope.searchfn = function(input) {

        if ( !! input) {
            var tmp = false;
            angular.forEach($scope.search, function(val, key) {
                if ( !! (input[key].indexOf(val || '') !== -1)) {
                    tmp = true;
                }
            });
            return tmp;
        }
    };
    $scope.open = function(input) {
        alert(input);
    };
});
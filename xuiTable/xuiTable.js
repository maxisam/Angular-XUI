/**
 * Created by linsz on 3/14/14.
 */
angular.module('xui.table', ['ui.bootstrap.pagination'])
    .controller('xuiTableCtrl', ['$scope', '$attrs', 'orderByFilter', '$filter', '$parse',
        function($scope, $attrs, orderByFilter, $filter, $parse) {

            var attrs = ['tableHeaders', 'tableData', 'itemsPerPage', 'pageWindow', 'tableFilterFactor'];
            angular.forEach(attrs, function(val) {
                $scope.$parent.$watch($parse($attrs[val]), function (newVal) {
                    $scope[val] = newVal;
                    that.search();
                }, true);
            });

            $attrs.$observe('tablePager', function(val) {
                $scope.tablePager = val;
            });

            $scope.tableFilter = function(locals) {
                return $parse($attrs.tableFilter)($scope.$parent, locals);
            };

            var that = this;
            $scope.Page = {
                current: 1
            };
            $scope.sort = {
                column: '',
                descending: false
            };
            $scope.SelectedCol = function(column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            $scope.ChangeSorting = function(column) {
                if ($scope.sort.column == column) {
                    $scope.sort.descending = !$scope.sort.descending;
                } else {
                    $scope.sort.column = column.toString();
                    $scope.sort.descending = false;
                }
                $scope.tableDataFiltered = orderByFilter($scope.tableDataFiltered, $scope.sort.column, $scope.sort.descending);
                that.pagination();
            };

            this.pagination = function() {
                $scope.pagedItems = [];
                if ( !! $scope.tablePager && angular.lowercase($scope.tablePager) === 'true') {
                    for (var i = 0; i < $scope.tableDataFiltered.length; i++) {
                        if (i % $scope.itemsPerPage === 0) {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tableDataFiltered[i]];
                        } else {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tableDataFiltered[i]);
                        }
                    }
                } else {
                    $scope.pagedItems[0] = $scope.tableDataFiltered;
                }

            };

            this.search = function() {
                if ( !! $scope.tableFilterFactor && !angular.equals($scope.tableFilterFactor, {}) && !! $scope.tableFilter) {
                    $scope.tableDataFiltered = $filter('filter')($scope.tableData, function(input) {
                        return $scope.tableFilter({
                            input: input
                        });
                    });
                } else {
                    $scope.tableDataFiltered = $scope.tableData;
                }
                that.pagination();
            };
            this.search();
            $scope.$watch('tableFilterFactor', function(newVal) {
                that.search();
            }, true);
        }
    ])
    .directive('xuiTable', ['$compile',
        function($compile) {
            return {
                scope: true,
                replace: true,
                transclude: true,
                templateUrl: 'xuiTable.html',
                controller: 'xuiTableCtrl',
                link: function(scope, elm, attrs, controller, transcludeFn) {
                    var tbody = transcludeFn(scope, function(clone) {
                        clone.children('tr').attr("ng-repeat", 'row in  pagedItems[Page.current-1]');
                    });
                    $compile(tbody)(scope, function(clone) {
                        elm.addClass(attrs.xuiTable).append(clone);
                    });
                }
            };
        }
    ]);

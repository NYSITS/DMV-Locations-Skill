'use strict';
angular.module('DmvApp', []).controller('DmvCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('https://data.ny.gov/resource/sgzi-bkw8.json').then(function(response) {
    console.log(response.data);
    $scope.dmv = response.data;
  });
}]);

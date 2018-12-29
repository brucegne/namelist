var app = angular.module('StarterApp', ['ngMaterial', 'firebase']);

app.controller('AppCtrl', ['$scope', '$firebaseArray', '$mdToast', function($scope, $firebaseArray, $mdToast) {
  var ref = new Firebase("https://bgblog-f5606.firebaseio.com/list");

  $scope.loaded = false;
  $scope.add = false;
  var list = $firebaseArray(ref);

  list.$loaded()
    .then(function(result) {
      $scope.list = result;
      $scope.loaded = true;
    })
    .catch(function(error) {
      $mdToast.show(
        $mdToast.simple()
        .content("Error:", error)
        .hideDelay(3000)
      );
    });

  $scope.deleteFromList = function(item) {
    $scope.list.$remove(item).then(function(record) {
      $mdToast.show(
        $mdToast.simple()
        .content(item.name + ' was deleted from the list')
        .hideDelay(3000)
      );
    });
  }

  $scope.addToList = function(item) {
    $scope.list.$add(item).then(function(record) {
      $scope.add = false;
      $mdToast.show(
        $mdToast.simple()
        .content(item.name + ' was added to the list')
        .hideDelay(3000)
      );
    });
  }
}]);
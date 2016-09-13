angular.module('app', []);
angular.module('app').controller('chartController', ['$scope', chartController]);

function chartController($scope) {
    $scope.draw = function() {
        var dataSets = [];
        console.log($scope.userInputs.dataSets);
        for (var i = 0; i < $scope.userInputs.dataSets.length; i++) {
            dataSets.push($scope.userInputs.dataSets[i].split(","));
            console.log($scope.userInputs.dataSets[i]);
        }
        var xyLabels = $scope.userInputs.xyLabels.split(",");
        $scope.chartData = {
            "seriesSet": $scope.userInputs.series.split(","),
            "labelSet": $scope.userInputs.labels.split(","),
            "dataSet": dataSets,
            "xyLabels": {
                "x": xyLabels[0],
                "y": xyLabels[1]
            }
        }
        console.log($scope.chartData);
    }
    $scope.addPoints = function() {
        $scope.userInputs.dataSets.push("");
    }
    $scope.setDefaults = function() {

        $scope.userInputs = {};
        $scope.userInputs.dataSets = [];
        $scope.userInputs.dataSets.push("");
    }
    $scope.init = function() {
        $scope.setDefaults();
    }
    $scope.init();
}

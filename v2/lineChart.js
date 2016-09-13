angular
    .module('app')
    .directive('lineChart', ['$timeout', lineChartService]);

function lineChartService($timeout) {
    var drawLineService = new((function() {
        var DrawLineService, DrawService, d;

        DrawService = (function() {
            function DrawService() {}

            DrawService.prototype.getCanvasContext = function(id) {
                if (id) {
                    return document.getElementById(id).getContext("2d");
                } else {
                    return null;
                }
            };

            return DrawService;

        })();

        DrawLineService = (function() {
            function DrawLineService() {}

            DrawLineService.prototype.drawService = new DrawService;

            DrawLineService.prototype.colors = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11", "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#3B3EAC"];

            DrawLineService.prototype.defaultDataRow = {
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#46BFBD",
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'round',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                spanGaps: false
            };

            DrawLineService.prototype.getPreparedData = function(data) {
                var dataRow, dataSet, i, index, len, preparedData, preparedDataRow;
                preparedData = {};
                preparedData.labels = data.labelSet;
                preparedData.datasets = [];
                dataSet = data.dataSet;
                for (index = i = 0, len = dataSet.length; i < len; index = ++i) {
                    dataRow = dataSet[index];
                    preparedDataRow = angular.copy(this.defaultDataRow);
                    preparedDataRow.data = dataRow;
                    preparedDataRow.backgroundColor = preparedDataRow.borderColor = this.colors[index];
                    preparedDataRow.label = data.seriesSet[index];
                    preparedData.datasets.push(preparedDataRow);
                }
                return preparedData;
            };

            DrawLineService.prototype.drawLine = function(canvasId, data) {
                var options, preparedData;
                preparedData = this.getPreparedData(data);
                options = {
                    scaleOverride: true,
                    responsive: false,
                    maintainAspectRatio: true,
                    tension: 10,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: data.xyLabels ? (data.xyLabels.y || "") : ""
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: data.xyLabels ? (data.xyLabels.x || "") : ""
                            }
                        }]
                    }
                };
                var ctx = document.getElementById(canvasId).getContext("2d");
                return new Chart(ctx, {
                    type: 'line',
                    data: preparedData,
                    options: options
                });

            };

            return DrawLineService;

        })();

        return DrawLineService;

    })());

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4();
    }

    function draw(id, chartData, reset) {
        if (reset) {
            id = newCanvas(id, chartData.width, chartData.height);
        }
        return drawLineService.drawLine(id, chartData);
    }

    function delayDraw(id, chartData, reset) {
        $timeout(function() {
            draw(id, chartData, reset);
        }, 300);
    }

    function newCanvas(id, width, height) {
        var div = document.getElementById(id);
        div.innerHTML = '';
        var canvas = document.createElement("canvas");
        canvas.height = height || "700";
        canvas.width = width || "1100";
        canvas.id = id + "-canvas";
        div.appendChild(canvas);
        return canvas.id;
    }

    return {
        scope: {
            'chartData': '='
        },
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.id = guid();
            $scope.$watch('chartData', function() {
                var chartData = angular.copy($scope.chartData);
                if (chartData) {
                    delayDraw($scope.id, chartData, true);
                }
            }, true);
        },
        restrict: 'A',
        templateUrl: 'lineChart.html',
        replace: false,
        transclude: true
    };
}

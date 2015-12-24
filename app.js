angular.module('app', []).controller('charts', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.clear = function() {
        document.getElementById("charts").innerHTML = "";
    };

    $scope.drawPie = function(chartId, data) {
        var data = google.visualization.arrayToDataTable(data);

        var options = {
            width: $scope.chartWidth,
            height: $scope.chartHeight,
            chartArea: {
                width: '100%',
                height: '80%'
            }
        };

        if ($scope.position == 0) {
            options.legend = 'none';
        } else {
            options.legend = {
                position: $scope.position
            };
        }

        var chart = new google.visualization.PieChart(document.getElementById(chartId));

        chart.draw(data, options);
    };

    $scope.drawLine = function(chartId, data) {
        var options = {
            width: $scope.lineChartWidth,
            height: $scope.lineChartHeight
        }
        if ($scope.position == 0) {
            options.legend = 'none';
        } else {
            options.legend = {
                position: $scope.position
            };
        }


        var chart = new google.visualization.LineChart(document.getElementById(chartId));
        chart.draw(data, options);

    };

    $scope.addPoints = function() {
        $scope.pointSets.push({
            points: ""
        });
    };

    $scope.drawPieHop = function(points, index) {
        var names = $scope.chartNames;
        names = names ? names.split(",") : [];
        if (names && names.length == points.length) {

        } else {
            names = [];
            for (var i = 0; i < points.length; i++) {
                names.push("Point " + i);
            }
        }
        var data = [
            ["Key", "Value"]
        ];
        for (var i = 0; i < points.length; i++) {
            data.push([names[i], points[i]]);
        }
        var div = document.createElement("div");
        div.id = "pieChart" + index;
        div.style.float = "left";
        var charts = document.getElementById("charts")
        charts.appendChild(div);

        $scope.drawPie(div.id, data);
    };

    $scope.drawLineHop = function() {
        var pointSets = $scope.pointSets;
        var iPointSets = [];
        for (var i = 0; i < pointSets.length; i++) {
            var points = pointSets[i].points.split(",");
            points = points.map(Number);
            iPointSets.push(points);
        }
        var tempData = [];
        for (var i = 0; i < iPointSets[0].length; i++) {
            tempData.push([i]);
        }

        for (var i = 0; i < iPointSets.length; i++) {
            for (var j = 0; j < iPointSets[i].length; j++) {
                tempData[j].push(iPointSets[i][j]);
            }
        }

        var data = new google.visualization.DataTable();

        data.addColumn('number', 'X');
        if ($scope.chartNames) {
            var chartNames = $scope.chartNames.split(",");
            for (var i = 0; i < iPointSets.length; i++) {
                data.addColumn('number', chartNames[i] ? chartNames[i] : "Index : " + i);
            }
        } else {
            for (var i = 0; i < iPointSets.length; i++) {
                data.addColumn('number', "Index : " + i);
            }
        }

        data.addRows(tempData);
        var div = document.createElement("div");
        div.id = "lineChart";
        div.style.float = "left";
        var charts = document.getElementById("charts")
        charts.appendChild(div);
        $scope.drawLine("lineChart", data);
    };

    $scope.drawBar = function(data) {

        var data = google.visualization.arrayToDataTable(data);

        var options = {
            width: $scope.barChartWidth,
            height: $scope.barChartHeight,
            chartArea: {
                width: '50%'
            }
        };

        if ($scope.position == 0) {
            options.legend = 'none';
        } else {
            options.legend = {
                position: $scope.position
            };
        }


        var chart = new google.visualization.BarChart(document.getElementById('barChart'));

        chart.draw(data, options);


    };

    $scope.drawBarHop = function() {
        var pointSets = $scope.pointSets;
        var data = [];

        var temp = $scope.chartNames.split(",");


        data.push(temp);
        for (var i = 0; i < pointSets.length; i++) {
            var temp = pointSets[i].points.split(",");
            var temp1 = [String(temp[0])];
            for (var j = 1; j < temp.length; j++) {
                temp1.push(Number(temp[j]));
            }
            data.push(temp1);
        }

        var div = document.createElement("div");
        div.id = "barChart";
        div.style.float = "left";
        var charts = document.getElementById("charts")
        charts.appendChild(div);
        $scope.drawBar(data);
    };

    $scope.draw = function() {
        $scope.clear();
        if ($scope.pieCheckbox) {
            var pointSets = $scope.pointSets;
            for (var i = 0; i < pointSets.length; i++) {
                var points = pointSets[i].points.split(",");
                points = points.map(Number);
                $scope.drawPieHop(points, i);
            }
        }
        if ($scope.lineCheckbox) {
            $scope.drawLineHop($scope.pointSets);
        }
        if ($scope.barCheckbox) {
            $scope.drawBarHop();
        }
    };

    $scope.setDefaults = function() {
        $scope.pointSets = [];
        $scope.pointSets.push({
            points: "12,1,23,12,11"
        });
        $scope.position = 'right';
        $scope.chartWidth = 300;
        $scope.chartHeight = 300;
        $scope.pieCheckbox = false;
        $scope.lineCheckbox = true;
        $scope.barCheckbox = false;
        $scope.lineChartWidth = 600;
        $scope.lineChartHeight = 300;
        $scope.barChartWidth = 600;
        $scope.barChartHeight = 300;
        $scope.draw();
    };

    $scope.init = function() {
        $scope.setDefaults();
    };

    $scope.init();

}]);

/**
 * Created by sereb on 10/7/2017.
 */

desking.controller('graphCtrl', ['dataService', 'timeService', '$scope','$timeout',function(dataService, timeService, $scope,$timeout) {

	// $scope.width = $("#graphPane").width();
	// $scope.height = $("#graphPane").height();
    //
	// $scope.$watch(function(){
	// 	return $('#graphPane').width();
	// }, function (newValue, oldValue, $scope) {
    //
	// 	// $scope.width = $("#graphPane").width();
	// 	if($scope.api==undefined ||$scope.donutApi==undefined ){
    //
	// 		return;
	// 	}
    //
	// 	if(Math.abs(newValue-$scope.width)/$scope.width>0.25){
    //
	// 	}
    //
     //    $scope.api.refresh();
     //    $scope.donutApi.refresh();
	// }, true);
    //
    //
	// var updateGraph = function(){
    //
	// 	$scope.data = dataService.getChartData();
	// 	$scope.api.refresh();
	// 	$scope.donutApi.refresh();
	// 	timeService.setTime(timeService.getTimeline()[0]);
	// 	updateDonutchart();
    //
	// }
    //
	// $scope.options = {
	// 	chart: {
	// 		type: 'stackedAreaChart',
	// 		height: $scope.height/2,
	// 		margin : {
	// 			top: 20,
	// 			right: 20,
	// 			bottom: 30,
	// 			left: 40
	// 		},
	// 		x: function(d){ return d[0];},
	// 		y: function(d){return d[1];},
	// 		useVoronoi: false,
	// 		clipEdge: true,
	// 		duration: 100,
	// 		useInteractiveGuideline: true,
	// 		xAxis: {
	// 			showMaxMin: true,
	// 			tickFormat: function(d) {
	// 				return d3.time.format('%d/%m/%Y')(new Date(d))
	// 			}
	// 		},
	// 		yAxis: {
	// 			tickFormat: function(d){
	// 				return d3.format('d')(d);
	// 			}
	// 		},
	// 		zoom: {
	// 			enabled: true,
	// 			scaleExtent: [1, 10],
	// 			useFixedDomain: false,
	// 			useNiceScale: false,
	// 			horizontalOff: false,
	// 			verticalOff: true,
	// 			unzoomEventType: 'dblclick.zoom'
	// 		},
	// 		interactiveLayer: {
    //
	// 			dispatch: {
	// 				elementMousemove: function(e) {
    //
	// 					// var today = new Date(e.pointXValue);
	// 					// $scope.scrollValue=today.toDateString();
	// 					// console.log(e.mouseX + " " + e.mouseY + " " +e.pointXValue);
	// 				},
	// 				elementClick: function(e) {
	// 					// console.log(e.mouseX + " " + e.mouseY + " " + e.pointXValue);
	// 				}
	// 			},
	// 		}
	// 	}
    //
	// };
    //
	// $scope.data = dataService.getChartData();
    //
    //
	// var updateDonutchart = function(){
    //
    //
	// 	$scope.activeDate=timeService.getTime();
    //
	// 	$scope.donutOptions = {
	// 		chart: {
	// 			type: 'pieChart',
	// 			height:  $scope.height/2,
	// 			donut: true,
	// 			x: function(d){return d.key;},
	// 			y: function(d){return d.y;},
	// 			showLabels: true,
    //
	// 			pie: {
	// 				startAngle: function(d) { return d.startAngle },
	// 				endAngle: function(d) { return d.endAngle }
	// 			},
	// 			duration: 500,
	// 			legend: {
	// 				margin: {
	// 					top: 5,
	// 					right: 70,
	// 					bottom: 5,
	// 					left: 0
	// 				}
	// 			}
	// 		}
	// 	};
    //
    //
    //
	// 	$scope.donutData= $scope.data.map(function(data){
    //
	// 		var obj={};
	// 		obj.key=data['key'];
	// 		obj.y=data['values'].map(function(time){
    //
     //            return (time[0]==$scope.activeDate)? +time[1] :0;
     //        }).reduce(function(a,b){
     //            return a + b;
     //        },0);
    //
	// 		return obj;
    //
	// 		// return{ key:data['key'],
	// 		// 	y:data['values'].map(function(time){
     //        //
	// 		// 		return (time[0]==$scope.activeDate)? +time[1] :0;
	// 		// 	}).reduce(function(a,b){
	// 		// 		return a + b;
	// 		// 	},0)
     //        //
	// 		// };
    //
	// 	});
    //
    //
	// 	$scope.SDE3Level1Desks=132;
	// 	$scope.SDE3Level2Desks=264;
	// 	$scope.SDE4Level6Desks=108;
    //
    //
	// 	$scope.totalDesks=$scope.SDE3Level1Desks+$scope.SDE3Level2Desks+$scope.SDE4Level6Desks;
	// 	$scope.occupiedDesks=0;
    //
	// 	for (i = 0; i < $scope.donutData.length; i++) {
	// 		$scope.occupiedDesks += $scope.donutData[i].y;
	// 	}
    //
	// 	if($scope.occupiedDesks>=0){
	// 		var emptySeats={
	// 			key: "EmptySeats",
	// 			y: $scope.totalDesks-$scope.occupiedDesks
    //
	// 		}
	// 		$scope.donutData.push(emptySeats);
	// 	}
    //
	// }
    //
	// dataService.registerGraphObserverCallback(updateGraph);
	// timeService.registerObserverCallback(updateDonutchart);

}]);

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

    $scope.SDE3Level1Desks=132;
    $scope.SDE3Level2Desks=264;
    $scope.SDE4Level6Desks=108;
    $scope.maxDesks = $scope.SDE3Level1Desks+$scope.SDE3Level2Desks+$scope.SDE4Level6Desks;

    $scope.data = dataService.getChartData();
    $scope.rowData=dataService.getRows();
    $scope.timeline = timeService.getTimeline();

    d3.select("#graphDiv")
        .append("div")
        .classed("mainChart", true);

    d3.select("#graphDiv")
        .append("div")
        .classed("subCharts row", true);

    d3.select(".subCharts")
        .append("div")
        .classed("subBarChart col-md-6 ", true);

    d3.select(".subCharts")
        .append("div")
        .classed("subPieChart col-md-6", true);

    var drawMainChart = function(){

        "use strict";

        $scope.width = $("#graphPane").width();
        $scope.height = $("#graphPane").height();
        $scope.rowData=dataService.getRows();
        $scope.timeLine=timeService.getTimeline();
        $scope.activeDate = timeService.getTime();


        var cont=d3.select(".mainChart");

        cont.html("");

        var margin = {top: 20, right: 60, bottom: 30, left: 40},
            width = $scope.width - margin.left - margin.right,
            height = $scope.height/2  - margin.top - margin.bottom;

        var svgMainChart = cont.append("svg")
            .attr('id','svgMainChart')
            .attr("width", $scope.width)
            .attr("height", $scope.height/2);

        var x_extent=d3.extent($scope.rowData,function(d){
            return d['formattedDate'];
        });

        var time_scale=d3.time.scale()
            .range([margin.left,width])
            .domain(x_extent);

        var time_axis=d3.svg.axis()
            .scale(time_scale)
            .ticks(20)
            .tickFormat(function(d) { return d.getMonth(); })

        svgMainChart.append('g')
            .attr('class','x axis')
            .attr('transform','translate(0,'+ height +')')
            .call(time_axis);

        var desks_scale=d3.scale.linear()
            .range([height,margin.top])
            .domain([0,$scope.maxDesks]);

        var desks_axis=d3.svg.axis()
            .scale(desks_scale)
            .orient("left");

        svgMainChart.append('g')
            .attr('class','y axis')
            .attr('transform','translate('+ margin.left +',0)')
            .call(desks_axis);


    }
    var drawSubBarChart =function(){

        $scope.rowData=dataService.getRows();

        var cont=d3.select(".subBarChart");

        cont.html("");

        var margin = {top: 20, right: 20, bottom: 10, left: 40},
            width = $scope.width/2 - margin.left - margin.right,
            height = $scope.height/2  - margin.top - margin.bottom;

        var svgSubBarChart = cont.append("svg")
            .attr('id','svgSubBarChart')
            .attr("width", $scope.width/2)
            .attr("height", $scope.height/2);

        var x_extent=d3.extent($scope.rowData,function(d){
            return d['formattedDate'];
        });

        var time_scale=d3.time.scale()
            .range([margin.left,width])
            .domain(x_extent);

        var time_axis=d3.svg.axis()
            .scale(time_scale)
            .ticks(20)
            .tickFormat(function(d) { return d.getMonth(); })

        svgSubBarChart.append('g')
            .attr('class','x axis')
            .attr('transform','translate(0,'+ height +')')
            .call(time_axis);


        var desks_scale=d3.scale.linear()
            .range([height,margin.top])
            .domain([0,$scope.maxDesks]);

        var desks_axis=d3.svg.axis()
            .scale(desks_scale)
            .orient("left");

        svgSubBarChart.append('g')
            .attr('class','y axis')
            .attr('transform','translate('+ margin.left +',0)')
            .call(desks_axis);

    }
    var drawSubPieChart = function (timeline,data) {

        var cont=d3.select(".subPieChart");

        cont.html("");

        var margin = {top: 20, right: 30, bottom: 10, left: 20},
            width = $scope.width/2 - margin.left - margin.right,
            height = $scope.height/2  - margin.top - margin.bottom,
            radius = Math.min(width, height) / 2;

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 80);

        var color = d3.scale.category20();
        color.domain(data.map(function(arr){return arr['key'];}));

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.students; });


        var svgSubPieChart = cont.append("svg")
            .attr('id','svgSubPieChart')
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        var pieData=color.domain().map(function(year,i) {
            return {
                year: year,
                students: +data[i]['values'].map(function(d) {
                    return (d[0]==timeline)? +d[1] :0;
                }).reduce(function(a,b){
                    return a + b;
                },0)
            };
        });

        $scope.occupiedDesks=0;

        for (i = 0; i < pieData.length; i++) {
            $scope.occupiedDesks += pieData[i].students;
        }

        if($scope.occupiedDesks>=0){

            var vacantSeats={
                year:"VacantSeats",
                students:$scope.maxDesks-$scope.occupiedDesks
            }
            color.domain().push(vacantSeats.year);
            pieData.push(vacantSeats);
        }

        var pies = pie(pieData);

        var g = svgSubPieChart.selectAll(".arc")
            .data(pies)
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.year); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.year; });

    }


    var updateAll = function(){

        $scope.data = dataService.getChartData();
        $scope.rowData=dataService.getRows();
        $scope.timeline = timeService.getTimeline();
        $scope.activeDate = $scope.timeline[0];
        // drawMainChart();
        // drawSubBarChart();
        // drawSubPieChart($scope.activeDate,$scope.data);
    }

    var updateCurrentTime = function(){

        if($scope.activeDate!=timeService.getTime()){

            drawRestructuredSubChart(timeService.getTime());
            $scope.activeDate = timeService.getTime();

        }
        // $scope.activeDate = timeService.getTime();
        // // drawSubPieChart($scope.activeDate,$scope.data);

        // drawRestructuredPieChart($scope.activeDate);

    }

    var updateRestructuredData = function(){

        drawRestructuredMainChart();


    }

    var drawRestructuredMainChart = function(){

        $scope.width = $("#graphPane").width();
        $scope.height = $("#graphPane").height();
        $scope.timeline = timeService.getTimeline();
        $scope.restructuredData = dataService.getRestructuredData();

        var facts = crossfilter($scope.restructuredData);
        var desksAllocatedKey = function(fact){return +fact.DesksAllocated};
        var formattedTimeKey = function(fact){return fact.FormattedClassStartTime;};

        var dateDimesion = facts.dimension(function(fact){

            var date = fact.Date == undefined ? [] :  fact.Date.split("/");
            // var time = fact.Time == undefined ? [] :  fact.Time.split(":");
            var startTime = new Date();
            startTime.setDate(date[0]);
            startTime.setMonth(date[1]-1);
            startTime.setYear(date[2]);
            startTime.setHours(9);
            startTime.setMinutes(0);
            startTime.setSeconds(0);
            startTime.setMilliseconds(0);

            return startTime.getTime();

        });
        var formattedDateDimension = facts.dimension(formattedTimeKey);



        var dateGroup = dateDimesion.group();//.reduceSum( desksAllocatedKey);
        var formattedDateGroup = formattedDateDimension.group().reduceSum(function(fact){return +fact.DesksAllocated;});

        var updatedFacts = crossfilter(formattedDateGroup.all());
        var updatedFactsDimesion = updatedFacts.dimension(function(updatedFact){


            return updatedFact.key;

        });


        var dateGroup1 = dateDimesion.group().reduce(
            function(p,v){

                if(p<v.DesksAllocated){

                    p=v.DesksAllocated;
                }
                return p;
            },
            function(){},
            function(){ return 0; });

        // console.log(updatedFactsDimesion.top(10));

        var mainChart = dc.barChart(".mainChart");

        mainChart
            .width($scope.width)
            .height($scope.height/2)
            .x(d3.time.scale().domain([new Date($scope.timeline[0]), new Date($scope.timeline[$scope.timeline.lenght-1])]))
            .xUnits(d3.time.days)
            .y(d3.scale.linear().domain([0,$scope.maxDesks+50]))
            .brushOn(false)
            .xAxisLabel('Timeline')
            .yAxisLabel("Max Desks Needed in the Day")
            .dimension(dateDimesion)
            .group(dateGroup1)
            .elasticX(true)
            // .xAxisPadding(900000)
            .controlsUseVisibility(true)
            .mouseZoomable(true)
            .title(function(d) {
                var formatDate = d3.time.format("%e %b %Y")
                return formatDate(new Date(d.key)) + ' : ' + d.value;
            })
            .on('pretransition', function(mainChart) {
                mainChart.selectAll("rect.bar").on("click", function (d) {

                    //console.log(d.data.key,"TimeService updated from main Graph");
                    console.log(d.data);
                    timeService.setTime(d.data.key);
                    // drawRestructuredSubChart(d.data.key);
                    // drawRestructuredPieChart(d.data.key);
                    mainChart.filter(null)
                        .filter(d.data.key)
                        .redrawGroup();
                });

                var left_y = $scope.maxDesks, right_y = $scope.maxDesks; // use real statistics here!
                var extra_data = [{x: mainChart.x().range()[0], y: mainChart.y()(left_y)}, {x: mainChart.x().range()[1], y: mainChart.y()(right_y)}];
                var line = d3.svg.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .interpolate('linear');
                var chartBody = mainChart.select('g.chart-body');
                var path = chartBody.selectAll('path.extra').data([extra_data]);
                path.enter().append('path').attr({
                    class: 'extra',
                    stroke: 'red',
                    id: 'extra-line'
                });
                path.attr('d', line);
                // and perhaps you'd like to label it?
                var text = chartBody.selectAll('text.extra-label').data([0]);
                text.enter().append('text')
                    .attr('text-anchor', 'middle')
                    .append('textPath').attr({
                    class: 'extra-label',
                    'xlink:href': '#extra-line',
                    startOffset: '50%'
                })
                    .text('MaxDesks');
            });

        mainChart.xAxis().ticks(5);


        mainChart.render();




    }

    var drawRestructuredSubChart = function(selectedDate){
        $scope.width = $("#graphPane").width();
        $scope.height = $("#graphPane").height();

        $scope.restructuredData = dataService.getRestructuredData();

        var facts = crossfilter($scope.restructuredData);
        var desksAllocatedKey = function(fact){return +fact.DesksAllocated;};
        var formattedTimeKey = function(fact){return fact.FormattedClassStartTime;};


        var formattedDateDimension = facts.dimension(formattedTimeKey);
        var formattedDateFilterDimension = facts.dimension(formattedTimeKey);

        var startTime = new Date(selectedDate);
        var endTime = new Date(selectedDate);
        startTime.setHours(9);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);
        endTime.setHours(18);
        endTime.setMinutes(0);
        endTime.setSeconds(0);
        endTime.setMilliseconds(0);

        formattedDateFilterDimension.filter([startTime.getTime(),endTime.getTime()]);

        var formattedDateGroup = formattedDateDimension.group().reduceSum(function(fact){return +fact.DesksAllocated;});

        var subBarChart = dc.barChart(".subBarChart");

        subBarChart
            .width($scope.width/2)
            .height($scope.height/2)
            .x(d3.time.scale().domain([startTime, endTime]))
            .xUnits(d3.time.hours)
            .brushOn(false)
            .yAxisLabel("DesksAllocated!")
            .dimension(formattedDateDimension)
            .renderLabel(true)
            .group(formattedDateGroup)
            .valueAccessor(function(d) {return +d.value;})
            .on('pretransition', function(subBarChart) {
                subBarChart.selectAll("rect.bar").on("click", function (d) {
                    // console.log(d.data);
                    timeService.setTime(d.data.key);
                    drawRestructuredPieChart(d.data.key);
                    console.log(d.data.key);
                    // drawSubPieChart(d.data.key,$scope.data);
                });


            });

        subBarChart.xAxis().tickFormat(d3.time.format('%H'))

        subBarChart.render();

    }

    var drawRestructuredPieChart = function(selectedDate){

        $scope.width = $("#graphPane").width();
        $scope.height = $("#graphPane").height();
        radius = Math.min($scope.width, $scope.height) / 2;

        $scope.restructuredData = dataService.getRestructuredData();

        console.log($scope.restructuredData);

        var facts = crossfilter($scope.restructuredData);
        var desksAllocatedKey = function(fact){return +fact.DesksAllocated;};
        var nameKey = function(fact){return fact.Name;};
        var formattedTimeKey = function(fact){return fact.FormattedClassStartTime;};


        var formattedDateDimension = facts.dimension(formattedTimeKey);
        var formattedDateFilterDimension = facts.dimension(formattedTimeKey);

        formattedDateFilterDimension.filter(selectedDate);
        console.log(formattedDateFilterDimension.top(Infinity));

        var updatedFacts=crossfilter(formattedDateFilterDimension.top(Infinity));
        var nameDimension = updatedFacts.dimension(nameKey);
        var nameGroup = nameDimension.group().reduceSum(desksAllocatedKey);

        console.log(nameGroup.all());

        var formattedDateGroup = formattedDateDimension.group(function(fact){return fact.Name;});

        var subPieChart = dc.pieChart(".subPieChart");

        subPieChart
            .width($scope.width/2)
            .height($scope.height/2)
            .innerRadius(30)
            .externalLabels(30)
            .externalRadiusPadding(50)
            .drawPaths(true)
            .dimension(nameDimension)
            .group(nameGroup)
            .legend(dc.legend());
        // example of formatting the legend via svg
        // http://stackoverflow.com/questions/38430632/how-can-we-add-legends-value-beside-of-legend-with-proper-alignment
        subPieChart.on('pretransition', function(subPieChart) {
            subPieChart.selectAll('.dc-legend-item text')
                .text('')
                .append('tspan')
                .text(function(d) { return d.name; })
                .append('tspan')
                .attr('x', 100)
                .attr('text-anchor', 'end')
                .text(function(d) { return d.data; });
        });
        subPieChart.render();

    }

    dataService.registerGraphObserverCallback(updateAll);
    dataService.registerRestructuredDataObserverCallback(updateRestructuredData);
    timeService.registerObserverCallback(updateCurrentTime);

}]);


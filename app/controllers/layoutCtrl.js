/**
 * Created by sereb on 10/7/2017.
 */

desking.controller('layoutCtrl', ['$scope', 'dataService', 'timeService','$timeout', function ($scope, dataService, timeService,$timeout) {


	$scope.activeDate = 1025409600000;
	$scope.rowCollection = undefined;
	$scope.floorList = dataService.getFloors();
	$scope.deskArray=[];

	Date.prototype.addTimeMinutes = function(time) {
		var dat = new Date(this.valueOf())
		dat.setMinutes(dat.getMinutes()+time);
		return dat;
	};


	var timeChanged = function(){
		$scope.activeDate = timeService.getTime();
		occupiedClusters();
		// desksNeeded();
	}

	var dataChanged = function(){
		$scope.rowCollection = dataService.getRows();
		$scope.jsonData=dataService.getJsonData();
		timeChanged();
	}

	var occupiedClusters = function(){

		$scope.clusterIdArray=[];

		if($scope.rowCollection!=undefined){

			$scope.rowCollection.map(function(row){

				// console.log(row);
				var startTime=row.formattedDate;
				// console.log(new Date(startTime));
				var endTime=new Date(row.formattedDate);
				endTime=endTime.setMinutes(endTime.getMinutes()+ parseInt(row.Duration));
				// console.log(new Date(endTime));

				// if(row.formattedDate==$scope.activeDate){
				//
				//
				// }
				if(startTime<=$scope.activeDate && $scope.activeDate<=endTime){
					// console.log(row);
					// console.log(new Date(startTime));
					// console.log(new Date($scope.activeDate));
					// console.log(new Date(endTime));

					$scope.clusterIdArray = row['Desks'].split(",");


				}

			});
		}
		else{
			return;
		}

		var clusters = d3.selectAll('g g.cluster');

		clusters[0].map(function(cluster){


			var resetCluster=d3.select(cluster);
			resetCluster.classed("occupied", false);
			resetCluster.classed("mouseover", false);

			$scope.clusterIdArray.map(function(Id){

				if(Id==cluster.id){
					var occupiedCluster=d3.select(cluster);
					occupiedCluster.classed("occupied", !occupiedCluster.classed("occupied"));
				}
			});
		});

	}
	var insertSVG =function (){


		// d3.xml("assets/images/SDE3_6thFloor.svg").mimeType("image/svg+xml").get(function(error, xml) {
		// 	if (error) throw error;
		//
		// 	// document.getElementById("#d3svg").appendChild(xml.documentElement);
		// 	// document.body.appendChild(xml.documentElement);
		//
		// 	var element =  document.getElementById("d3svg");
		// 	element.appendChild(xml.documentElement);
		//
		// 	// var d3Element =d3.select("#d3svg").insert("svg",xml.documentElement);
		//
		// });
		//


		// d3.xml("assets/images/SDE3_2ndFloor.svg").mimeType("image/svg+xml").get(function(error, xml) {
		// 	if (error) throw error;
		//
		// 	var element =  document.getElementById("svg2");
		// 	element.appendChild(xml.documentElement);
		//
		// });
		//
		// d3.xml("assets/images/SDE3_6thFloor.svg").mimeType("image/svg+xml").get(function(error, xml) {
		// 	if (error) throw error;
		//
		// 	var element =  document.getElementById("svg3");
		// 	element.appendChild(xml.documentElement);
		//
		// });
		//
		// d3.xml("assets/images/SDE3_1stFloor.svg").mimeType("image/svg+xml").get(function(error, xml) {
		// 	if (error) throw error;
		//
		// 	var element =  document.getElementById("svg4");
		// 	element.appendChild(xml.documentElement);
		//
		// });


		d3.xml("assets/data/combined_plan4.svg").mimeType("image/svg+xml").get(function(error, xml) {
			if (error) throw error;

			var element =  document.getElementById("svg1");
			element.appendChild(xml.documentElement);

		});





	}


	$timeout(function(){
		var div=d3.select("body").append("div").attr("class", "deskInfo").style("opacity", 0);

		var clusters = d3.selectAll('g g.cluster');

		clusters.on('mouseover',function(){

			var cluster = d3.select(this);


			if(!cluster.classed("occupied")){
				cluster.classed("mouseover", true);
			}

			// console.log(cluster[0][0].id);

			div.transition()
				.duration(200)
				.style("opacity", 0.9);
			// div.html("<span class='firstLine'>4Mouse on Desk with id :  <br><span class='secondLine'>Desk Status:</span>")
			div.html("")
				.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 15) + "px");

			var tooltip=div.append("svg")
				.attr("class", "deskInfoSVG")
				.attr("width", 110)
				.attr("height", 75);

			tooltip.append("text")
				.attr("x", 0)
				.attr("y", 9)
				.attr("dy", ".25em")
				.style("text-anchor", "start")
				.text("ClusterID : "+cluster[0][0].id);


		});


		clusters.on('mouseout',function(){

			var cluster = d3.select(this);

			if(cluster.classed("mouseover")){
				cluster.classed("mouseover", false);

			}

			div.transition()
				.duration(500)
				.style("opacity", 0);

		});
		clusters.on('click',function(){

			var cluster = d3.select(this);
			cluster.attr("class", "deskClicked");

			div.transition()
				.duration(500)
				.style("opacity", 0);

			// alert("ClusterID : "+desk[0][0].id+" is clicked");


		});

	},500);


	// $( document ).ready(function(){
	//
	// 	var div=d3.select("html").append("div").attr("class", "deskInfo").style("opacity", 0);
	//
	// 	var desks = d3.selectAll('g g.cluster');
	// 	console.log(d3.selectAll('g g.cluster'));
	//
	//
	// 	desks.on('mouseover',function(){
	//
	// 		var desk = d3.select(this);
	// 		desk.attr("class", "mouseover");
	// 		// console.log(desk[0][0].id);
	//
	// 		div.transition()
	// 			.duration(200)
	// 			.style("opacity", 0.9);
	// 		// div.html("<span class='firstLine'>4Mouse on Desk with id :  <br><span class='secondLine'>Desk Status:</span>")
	// 		div.html("")
	// 			.style("left", (d3.event.pageX + 5) + "px")
	// 			.style("top", (d3.event.pageY - 15) + "px");
	//
	// 		var tooltip=div.append("svg")
	// 			.attr("class", "deskInfoSVG")
	// 			.attr("width", 200)
	// 			.attr("height", 75);
	//
	// 		tooltip.append("text")
	// 			.attr("x", 0)
	// 			.attr("y", 9)
	// 			.attr("dy", ".25em")
	// 			.style("text-anchor", "start")
	// 			.text("ClusterID : "+desk[0][0].id);
	//
	//
	// 	});
	//
	//
	// 	desks.on('mouseout',function(){
	//
	// 		var desk = d3.select(this);
	// 		desk.attr("class", "mouseoff");
	//
	// 		div.transition()
	// 			.duration(500)
	// 			.style("opacity", 0);
	//
	// 	});
	//
	// });








	$scope.init=function(){
		insertSVG();

	}



	var desksNeeded = function(){

		$scope.rowCollection = dataService.getRows();
		$scope.deskArray=[];
		$scope.totaldesks=0;

		$scope.rowCollection.map(function(row){

			if(row.formattedDate==$scope.activeDate){
				$scope.deskArray.push(parseInt(row.desks));
				$scope.totaldesks=$scope.totaldesks+parseInt(row.desks);
			}
		});
		// fillSVGElements($scope.totaldesks);
		fillDesks($scope.totaldesks);

	}

	function getSubDocument(embedding_element) {
		if (embedding_element.contentDocument)
		{
			return embedding_element.contentDocument;
		}
		else
		{
			var subdoc = null;
			try {
				subdoc = embedding_element.getSVGDocument();
			} catch(e) {}
			return subdoc;
		}
	}


	// fetches the document for the given embedding_element
	function fillSVGElements(desks) {
		var elms = document.querySelectorAll(".emb");
		for (var i = 0; i < elms.length; i++)
		{
			var subdoc = getSubDocument(elms[i])

			if (subdoc )
			{
				for(i=1;i<=156;i++){
					if(subdoc.getElementById(i)==null){
						return;
					}
					subdoc.getElementById(i).setAttribute("stroke", "black");
					subdoc.getElementById(i).setAttribute("fill", "rgb(247,148,32)");

				}

				for(i=1;i<=desks;i++){

					if(subdoc.getElementById(i)==null){
						return;
					}
					subdoc.getElementById(i).setAttribute("stroke", "black");
					subdoc.getElementById(i).setAttribute("fill", "lime");
				}
			}
			else{
				return;
			}

		}

	}

	var fillDesks = function(deksToFill){

		for(i=1;i<=156;i++){

			if(document.getElementById(i)==null){
				// console.warn("no d3 element with id ");
				continue;
			}

			//d3.select('#'+i).setAttribute("stroke", "black").setAttribute("fill", "rgb(247,148,32)");
			var obj = document.getElementById(i)
			obj.setAttribute("stroke", "black")
			obj.setAttribute("fill", "rgb(247,148,32)");

		}

		for(i=1;i<=deksToFill;i++){

			if(document.getElementById(i)==null){
				// console.warn("no d3 element with id ");
				continue;
			}

			var obj = document.getElementById(i)
			obj.setAttribute("stroke", "black")
			obj.setAttribute("fill", "lime");

		}







	}


	timeService.registerObserverCallback(timeChanged);
	dataService.registerObserverCallback(dataChanged);



















}]);

/**
 * Created by sereb on 10/7/2017.
 */

spaceBlocker.controller('layoutCtrl', ['$scope', 'dataService', 'timeService', function ($scope, dataService, timeService) {


	$scope.activeDate = 1025409600000;
	$scope.rowCollection = undefined;
	$scope.floorList = dataService.getFloors();
	$scope.deskArray=[];


	var timeChanged = function(){
		$scope.activeDate = timeService.getTime();

		// desksNeeded();


	}

	var dataChanged = function(){

		$scope.rowCollection = dataService.getRows();
		timeChanged();

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


	timeService.registerObserverCallback(timeChanged);
	// dataService.registerObserverCallback(dataChanged);






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

	$( document ).ready(function() {
		var div=d3.select("html").append("div").attr("class", "deskInfo").style("opacity", 0);
		var desks = d3.selectAll('g.cluster');

		desks.on('mouseover',function(){



			var desk = d3.select(this);
			desk.attr("class", "mouseover");
			// console.log(desk[0][0].id);



			div.transition()
				.duration(200)
				.style("opacity", 0.9);
			// div.html("<span class='firstLine'>4Mouse on Desk with id :  <br><span class='secondLine'>Desk Status:</span>")
			div.html("")
				.style("left", (d3.event.pageX + 5) + "px")
				.style("top", (d3.event.pageY - 15) + "px");


			var tooltip=div.append("svg")
				.attr("class", "deskInfoSVG")
				.attr("width", 200)
				.attr("height", 75);



			tooltip.append("text")
				.attr("x", 0)
				.attr("y", 9)
				.attr("dy", ".25em")
				.style("text-anchor", "start")
				.text("ClusterID : "+desk[0][0].id);


		});


		desks.on('mouseout',function(){


			var desk = d3.select(this);
			desk.attr("class", "mouseoff");

			div.transition()
				.duration(500)
				.style("opacity", 0);


		});





	});



	var desksMouseOver = function(){


		var desks = d3.selectAll('g.cluster');


		desks.on('mouseover',function(){



			var desk = d3.select(this);
			desk.attr("class", "mouseover");



			div.transition()
				.duration(200)
				.style("opacity", 0.9);
			div.html("<span class='firstLine'>Mouse on Desk </span><br><span class='secondLine'>Desk Status:</span>")
			// div.html("")
				.style("left", (d3.event.pageX + 5) + "px")
				.style("top", (d3.event.pageY - 15) + "px");



		});


		desks.on('mouseout',function(){


			var desk = d3.select(this);
			desk.attr("class", "mouseoff");

			div.transition()
				.duration(500)
				.style("opacity", 0);


		});
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

	insertSVG();













}]);

/**
 * Created by sereb on 10/7/2017.
 */

desking.controller('layoutCtrl', ['$scope', 'dataService', 'timeService','$timeout','displayService', function ($scope, dataService, timeService,$timeout,displayService) {


	$scope.activeDate = 1025409600000;
	$scope.rowCollection = undefined;
    $scope.selectionButtonsDisplay=false;
    $scope.clusterIdArray=[];

	Date.prototype.addTimeMinutes = function(time) {
		var dat = new Date(this.valueOf())
		dat.setMinutes(dat.getMinutes()+time);
		return dat;
	};

    var insertSVG =function (){

        // d3.xml("assets/images/SDE3_2ndFloor.svg").mimeType("image/svg+xml").get(function(error, xml) {
        // 	if (error) throw error;
        //
        // 	var element =  document.getElementById("svg2");
        // 	element.appendChild(xml.documentElement);
        //
        // });

        d3.xml("assets/data/combined_plan4.svg").mimeType("image/svg+xml").get(function(error, xml) {
            if (error) throw error;

            var element =  document.getElementById("svg1");
            element.appendChild(xml.documentElement);

            var div=d3.select("body").append("div").attr("class", "deskInfo").style("opacity", 0);


            $scope.clusters = d3.selectAll('g g.cluster');

            $scope.clusters.on('mouseover',function(){

                var cluster = d3.select(this);

                div.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                // div.html("<span class='firstLine'>4Mouse on Desk with id :  <br><span class='secondLine'>Desk Status:</span>")
                div.html("")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");

                var tooltip=div.append("svg")
                    .attr("class", "deskInfoSVG")
                    .attr("width", 165)
                    .attr("height", 80);

                tooltip.append("text")
                    .attr("x", 0)
                    .attr("y", 9)
                    .attr("dy", ".25em")
                    .style("text-anchor", "start")
                    .text("ClusterID : "+cluster[0][0].id);

                if(!cluster.classed("occupied")){
                    cluster.classed("mouseover", true);

                    tooltip.append("text")
                        .attr("x", 0)
                        .attr("y", 22)
                        .attr("dy", ".25em")
                        .style("text-anchor", "start")
                        .text("        Empty     ");

                }
                else{
                    var clusterInfo ={};
                    $scope.displayGroups.map(function(group){
                        group.rows.map(function(row){
                            var clusterIdArray=[];
                            clusterIdArray = row['Desks'] == undefined ? [] : row["Desks"].split(",");
                            if($.inArray(cluster[0][0].id, clusterIdArray)&& timeService.getTime()==row['formattedDate']){

                                clusterInfo.date=row['Date'];
                                clusterInfo.startTime=row['Time'];

                                var endTime=new Date(row.formattedDate);
                                endTime=endTime.setMinutes(endTime.getMinutes()+ parseInt(row.Duration));
                                endTime=new Date(endTime);
                                var hours=endTime.getHours();
                                var minutes=endTime.getMinutes();
                                var seconds="00";
                                if(minutes==0){
                                    minutes="00";
                                }
                                var array=[];
                                array.push(hours);
                                array.push(minutes);
                                array.push(seconds);
                                endTime=array.join(":");

                                clusterInfo.endTime=endTime;
                                clusterInfo.courseName=group.name;
                                clusterInfo.type=row['Type'];

                            }

                        });

                    });

                    tooltip.append("text")
                        .attr("x", 0)
                        .attr("y", 25)
                        .attr("dy", ".25em")
                        .style("text-anchor", "start")
                        .text("Course : "+clusterInfo.courseName);

                    tooltip.append("text")
                        .attr("x", 0)
                        .attr("y",40 )
                        .attr("dy", ".25em")
                        .style("text-anchor", "start")
                        .text("Date : "+clusterInfo.date);

                    tooltip.append("text")
                        .attr("x", 0)
                        .attr("y",55 )
                        .attr("dy", ".25em")
                        .style("text-anchor", "start")
                        .text("Time : "+clusterInfo.startTime+" - "+clusterInfo.endTime);

                    tooltip.append("text")
                        .attr("x", 0)
                        .attr("y",70 )
                        .attr("dy", ".25em")
                        .style("text-anchor", "start")
                        .text("Type : "+clusterInfo.type);



                }


            });
            $scope.clusters.on('mouseout',function(){

                var cluster = d3.select(this);

                if(cluster.classed("mouseover")){
                    cluster.classed("mouseover", false);
                }

                div.transition()
                    .duration(500)
                    .style("opacity", 0);

            });
            $scope.clusters.on('click',function(){

                var group=displayService.getSelectionGroup();
                var row=displayService.getSelectionRow();


                // if(group.desksAlloted < group.totalDesksNeeded && $scope.selectionButtonsDisplay==true ){
                //
                //     var cluster = d3.select(this);
                //
                //     if(!cluster.classed("editing")){
                //         group.clusterIdArray.push(cluster[0][0].id);
                //
                //         cluster.classed("editing", true);
                //         div.transition()
                //             .duration(500)
                //             .style("opacity", 0);
                //
                //         group.desksAlloted=0;
                //
                //         $scope.clusters[0].map(function(cluster){
                //
                //             if(group.clusterIdArray.length>0){
                //                 group.clusterIdArray.map(function(Id){
                //
                //                     if(Id==cluster.id){
                //                         var desksAllotedCluster=d3.select(cluster);
                //                         group.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
                //                     }
                //                 });
                //             }
                //
                //         });
                //
                //     }
                //     else{
                //
                //         var index = group.clusterIdArray.indexOf(cluster[0][0].id);
                //         group.clusterIdArray.splice(index, 1);
                //
                //
                //         console.log(group.clusterIdArray);
                //         console.log($scope.deskArray);
                //         group.desksAlloted=0;
                //
                //         $scope.clusters[0].map(function(cluster){
                //
                //             if(group.clusterIdArray.length>0){
                //                 group.clusterIdArray.map(function(Id){
                //
                //                     if(Id==cluster.id){
                //                         var desksAllotedCluster=d3.select(cluster);
                //                         group.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
                //                     }
                //                 });
                //             }
                //
                //         });
                //         console.log(group.desksAlloted);
                //
                // 	console.log( index);
                //
                //         cluster.classed("editing", false);
                //
                // }
                //
                //     displayService.setUpdatedGroup(group);
                //
                // }

                // Removing the row.desks allocated from the if condition
                //row.desksAlloted < row.totalDesksNeeded &&
                if( $scope.selectionButtonsDisplay==true ){

                    var cluster = d3.select(this);
                    if(!cluster.classed("editing")  ){
                        row.clusterIdArray.push(cluster[0][0].id);
                        cluster.classed(" occupied editing", true);
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);

                        row.desksAlloted=0;

                        $scope.clusters[0].map(function(cluster){

                            if(row.clusterIdArray.length>0){
                                row.clusterIdArray.map(function(Id){

                                    if(Id==cluster.id){
                                        var desksAllotedCluster=d3.select(cluster);
                                        row.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
                                    }
                                });
                            }

                        });

                    }
                    else{

                        var index = row.clusterIdArray.indexOf(cluster[0][0].id);
                        row.clusterIdArray.splice(index, 1);


                        console.log(row.clusterIdArray);
                        row.desksAlloted=0;

                        $scope.clusters[0].map(function(cluster){

                            if(row.clusterIdArray.length>0){
                                row.clusterIdArray.map(function(Id){

                                    if(Id==cluster.id){
                                        var desksAllotedCluster=d3.select(cluster);
                                        row.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
                                    }
                                });
                            }

                        });

                        cluster.classed("occupied editing highlight", false);
                    }

                    displayService.setUpdatedRow(row);
                }

            });
        });

    }


    $scope.init=function(){
        insertSVG();
    }

	var timeChanged = function(){
		$scope.activeDate = timeService.getTime();
		occupiedClusters();
		// desksNeeded();
	}

	var dataChanged = function(){
		$scope.rowCollection = dataService.getRows();
        $scope.displayGroups = dataService.getDisplayGroups();
		$scope.jsonData=dataService.getJsonData();
		timeChanged();
	}

	var rowClicked = function(){
	    $scope.clickedRow = displayService.getClickedRow();

        $scope.clusters[0].map(function(cluster){

            var resetCluster=d3.select(cluster);
            resetCluster.classed("highlight", false);

            $scope.clickedRow.clusterIdArray.map(function(Id){

                if(Id==cluster.id){
                    var occupiedCluster=d3.select(cluster);
                    occupiedCluster.classed("highlight", occupiedCluster.classed("occupied"));

                }
            });
        });
    }

    var modeChanged = function(){

        if(displayService.getMode()=="selection"){
            $scope.selectionButtonsDisplay=true;
            $scope.selectionRow=displayService.getSelectionRow();

            $scope.clusterIdArray=[];

            $scope.selectionRow.clusterIdArray.map(function(clusterId){
                var id=clusterId;
                $scope.clusterIdArray.push(id);

            });

            console.log($scope.selectionRow.clusterIdArray);
            console.log($scope.clusterIdArray);

            if($scope.selectionRow.clusterIdArray!=undefined){

                $scope.clusters[0].map(function(cluster){

                    var resetCluster=d3.select(cluster);
                    resetCluster.classed("highlight", false);

                    $scope.selectionRow.clusterIdArray.map(function(Id){

                        if(Id==cluster.id){

                            var existingOccupiedCluster=d3.select(cluster);
                            existingOccupiedCluster.classed("highlight editing", existingOccupiedCluster.classed("occupied"));
                            existingOccupiedCluster.classed("occupied", !existingOccupiedCluster.classed("occupied"));

                        }
                    });
                });

            }

        }
        else{
            $scope.selectionButtonsDisplay=false;
        }

    }

    $scope.saveCurrentSelection=function(){

        displayService.setMode("display");
        displayService.updateJson();
        var group=displayService.getSelectionGroup();
        group.isOpen=true;
        console.log(group.isOpen);

    }

    $scope.cancelCurrentSelection=function(){

        var group=displayService.getSelectionGroup();
        var row=displayService.getUpdatedRow();
        // $scope.clusters = d3.selectAll('g g.cluster');

        $scope.clusters[0].map(function(element){

            var cluster = d3.select(element);
            if(cluster.classed(" occupied editing")){
                cluster.classed("occupied editing", false);
                var index = row.clusterIdArray.indexOf(cluster.id);
                row.clusterIdArray.splice(index, 1);
            }

        });

        row.desksAlloted=0;
        $scope.clusters[0].map(function(cluster){

            if(row.clusterIdArray.length>0){
                row.clusterIdArray.map(function(Id){

                    if(Id==cluster.id){
                        var desksAllotedCluster=d3.select(cluster);
                        row.desksAlloted+=desksAllotedCluster.selectAll('g rect')[0].length;
                    }
                });
            }

        });

        // group.isOpen=false;
        displayService.setMode("display");
        displayService.setUpdatedRow(row);
        displayService.setUpdatedGroup(group);
        occupiedClusters();
    }

    var occupiedClusters = function(){

		$scope.totalClustersOccupied=[];

		$scope.clusterIdArray=[];


		if($scope.rowCollection!=undefined){

			$scope.rowCollection.map(function(row){

                var clusterIdArray=[];

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

                    clusterIdArray = row['Desks'] == undefined ? [] : row["Desks"].split(",");
                    clusterIdArray.map(function(id){

                        $scope.totalClustersOccupied.push(id);

                    } );

				}

            });

		}
		else{
			return;
		}

		$scope.clusters[0].map(function(cluster){

			var resetCluster=d3.select(cluster);
			resetCluster.classed("occupied", false);
			resetCluster.classed("mouseover", false);
            resetCluster.classed("highlight", false);
            resetCluster.classed("editing", false);

			$scope.totalClustersOccupied.map(function(Id){

				if(Id==cluster.id){
					var occupiedCluster=d3.select(cluster);
					occupiedCluster.classed("occupied", !occupiedCluster.classed("occupied"));
				}
			});
		});
	}


	// var desksNeeded = function(){
    //
	// 	$scope.rowCollection = dataService.getRows();
	// 	$scope.deskArray=[];
	// 	$scope.totaldesks=0;
    //
	// 	$scope.rowCollection.map(function(row){
    //
	// 		if(row.formattedDate==$scope.activeDate){
	// 			$scope.deskArray.push(parseInt(row.desks));
	// 			$scope.totaldesks=$scope.totaldesks+parseInt(row.desks);
	// 		}
	// 	});
	// 	// fillSVGElements($scope.totaldesks);
	// 	fillDesks($scope.totaldesks);
    //
	// }

	// function getSubDocument(embedding_element) {
	// 	if (embedding_element.contentDocument)
	// 	{
	// 		return embedding_element.contentDocument;
	// 	}
	// 	else
	// 	{
	// 		var subdoc = null;
	// 		try {
	// 			subdoc = embedding_element.getSVGDocument();
	// 		} catch(e) {}
	// 		return subdoc;
	// 	}
	// }


	// fetches the document for the given embedding_element
	// function fillSVGElements(desks) {
	// 	var elms = document.querySelectorAll(".emb");
	// 	for (var i = 0; i < elms.length; i++)
	// 	{
	// 		var subdoc = getSubDocument(elms[i])
    //
	// 		if (subdoc )
	// 		{
	// 			for(i=1;i<=156;i++){
	// 				if(subdoc.getElementById(i)==null){
	// 					return;
	// 				}
	// 				subdoc.getElementById(i).setAttribute("stroke", "black");
	// 				subdoc.getElementById(i).setAttribute("fill", "rgb(247,148,32)");
    //
	// 			}
    //
	// 			for(i=1;i<=desks;i++){
    //
	// 				if(subdoc.getElementById(i)==null){
	// 					return;
	// 				}
	// 				subdoc.getElementById(i).setAttribute("stroke", "black");
	// 				subdoc.getElementById(i).setAttribute("fill", "lime");
	// 			}
	// 		}
	// 		else{
	// 			return;
	// 		}
    //
	// 	}
    //
	// }

	// var fillDesks = function(deksToFill){
    //
	// 	for(i=1;i<=156;i++){
    //
	// 		if(document.getElementById(i)==null){
	// 			// console.warn("no d3 element with id ");
	// 			continue;
	// 		}
    //
	// 		//d3.select('#'+i).setAttribute("stroke", "black").setAttribute("fill", "rgb(247,148,32)");
	// 		var obj = document.getElementById(i)
	// 		obj.setAttribute("stroke", "black")
	// 		obj.setAttribute("fill", "rgb(247,148,32)");
    //
	// 	}
    //
	// 	for(i=1;i<=deksToFill;i++){
    //
	// 		if(document.getElementById(i)==null){
	// 			// console.warn("no d3 element with id ");
	// 			continue;
	// 		}
    //
	// 		var obj = document.getElementById(i)
	// 		obj.setAttribute("stroke", "black")
	// 		obj.setAttribute("fill", "lime");
    //
	// 	}
    //
    //
    //
    //
    //
    //
    //
	// }


	timeService.registerObserverCallback(timeChanged);
	dataService.registerObserverCallback(dataChanged);
    displayService.registerModeObserverCallback(modeChanged);
    displayService.registerClickObserverCallback(rowClicked);



















}]);

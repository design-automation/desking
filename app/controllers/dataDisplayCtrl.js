
/**
 * Created by sereb on 6/7/2017.
 */

desking.controller('dataDisplayCtrl',['$scope','timeService','dataService','displayService','$timeout',function($scope, timeService, dataService,displayService,$timeout){
	// $scope.jsonData = undefined;
	// $scope.groups = [];
	$scope.display={groups:null};
	$scope.activeDate = undefined;


	// To load the table during loading of the page
	$( document ).ready(function() {

		$.ajax({
			url:"assets/data/intialDataFile.txt",
			type:'GET',
			dataType:"text",
			success:function(data){
				var jsonData =JSON.parse(data);
				dataService.setJsonData(jsonData);
			}
		});

	});

	$scope.getExcelFile = function () {


		var file = $('#controlButtons').find("#excelImport");
		file.trigger('click');

		var fileInputExcel = document.getElementById('excelImport');

		fileInputExcel.addEventListener('change', function (e) {

			var reader = new FileReader();

			reader.onload = function (e){

				/* read workbook */
				var bstr = e.target.result;
				var wb = XLSX.read(bstr, {type:'binary'});

				var jsonData={};

				for(var j=0;j<wb.SheetNames.length;j++){


					/* grab each sheet */

					var wsname = wb.SheetNames[j];
					var ws = wb.Sheets[wsname];

					/* grab first row and generate column headers */
					var aoa = XLSX.utils.sheet_to_json(ws, {header:1, raw:false});

					var cols = [];
					for(var i = 0; i < aoa[0].length; ++i){
                        cols[i] = { field: aoa[0][i] };
					}

					/* generate rest of the data */
					var data = [];
					for(var r = 1; r < aoa.length; ++r) {
						data[r-1] = {};
						for(i = 0; i < aoa[0].length; ++i) {
							if(aoa[r][i] == null)
							{
                                data[r-1][aoa[0][i]]=[];

                            }
							data[r-1][aoa[0][i]] = aoa[r][i];
						}

					}

					jsonData[wsname]=data;

					//console.log("got sheet ", j);
				}


				dataService.setJsonData(jsonData);


				/* update scope */
				/*$scope.$apply(function() {
				 $scope.opts.columnDefs = cols;
				 $scope.opts.data = data;
				 });*/
			};

			reader.readAsBinaryString(fileInputExcel.files[0]);




		});




	}
	$scope.saveExcelFile =function(){
		 var jsonData=dataService.getJsonData();

		var fileName='ClassScheduleData ';
		var today = new Date();

		fileName +=today.toString()+'.xlsx';
		var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };

		var wb = XLSX.utils.book_new();


		for(sheet in jsonData){

			var sheetName = sheet;
			var arrArr=[]

			for(x=0;x<jsonData[sheet].length;x++){

				var arr=[];
				if(x==0){
					var header=Object.keys(jsonData[sheet][0]);
					// header.pop();
					arrArr.push(header);
				}
				for(y in jsonData[sheet][x]){
							arr.push(jsonData[sheet][x][y]);
				}
				// arr.pop();
				arrArr.push(arr);
			}




			// for(x in $scope.jsonData[sheet]){
			//
			// 	var arr=[];
			// 	console.log($scope.jsonData[sheet][x]);
			// 	if(x==0){
			// 		arrArr.push(Object.keys($scope.jsonData[sheet][0]));
			// 	}
			// 	for(y in $scope.jsonData[sheet][x]){
			// 		arr.push($scope.jsonData[sheet][x][y]);
			// 	}
			// 	arrArr.push(arr);
			// }

			ws=XLSX.utils.aoa_to_sheet(arrArr);

			XLSX.utils.book_append_sheet(wb, ws, sheetName);

		}

		var wbout = XLSX.write(wb,wopts);
		console.log(fileName);
		saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName);


	}

	var s2ab= function (s){
		if(typeof ArrayBuffer !== 'undefined') {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
			return buf;
		} else {
			var buf = new Array(s.length);
			for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
			return buf;
		}
	}

	var populateTable = function () {

		if(dataService.getDisplayGroups().length == 0) {
            return;
        }
        else{
            $timeout(function(){
                $scope.display.groups=dataService.getDisplayGroups();
            },10);
		}
	}

	var selectedRow = function(row){

		console.log(row['formattedDate']," time service updated by clicking in the row of display pane");
		timeService.setTime(row['formattedDate']);
		//console.log("updated time", timeService.getTime());
		displayService.setClickedRow(row);

	}

	var highlight = function(){
		$scope.activeDate = timeService.getTime()
	}

	var allotDesks=function(group){

        if(group.mode=="selection" && !group.isOpen){

            displayService.setSelectionGroup(group);
       }
       else if(group.mode=="selection" && group.isOpen){
            displayService.setMode("display");
		}
       else
		{
            displayService.setMode(group.mode);

		}

		return group;
	}

    var selectDesks=function(group,row){

        row.mode="selection";

        if(row.mode=="selection" ){
            displayService.setSelectionGroup(group);
            displayService.setSelectionRow(row);
        }
        else
        {
            displayService.setMode(row.mode);
        }

        return group,row;
    }

    var updateGroups = function(){

        var updatedGroup=displayService.getUpdatedGroup();

        $scope.display.groups.map(function(group){

        	if(group.name==updatedGroup.name){
                group=updatedGroup;
			}

		});

        return $scope.display.groups;
    }


	$scope.selectedRow=selectedRow;
    $scope.populateTable=populateTable;
    $scope.allotDesks =allotDesks;
    $scope.selectDesks =selectDesks;


    displayService.registerObserverCallback(updateGroups);
    timeService.registerObserverCallback(highlight);
    dataService.registerGroupsObserverCallback(populateTable);



//

}]);

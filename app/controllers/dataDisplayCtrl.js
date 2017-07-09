
/**
 * Created by sereb on 6/7/2017.
 */

spaceBlocker.controller('dataDisplayCtrl',['$scope','timeService','dataService',function($scope,timeService,dataService){

	$scope.jsonData = undefined;
	$scope.groups = undefined;
	$scope.activeDate = undefined;

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
					for(var i = 0; i < aoa[0].length; ++i) cols[i] = { field: aoa[0][i] };

					/* generate rest of the data */
					var data = [];
					for(var r = 1; r < aoa.length; ++r) {
						data[r-1] = {};
						for(i = 0; i < aoa[r].length; ++i) {
							if(aoa[r][i] == null) continue;
							data[r-1][aoa[0][i]] = aoa[r][i]
						}

					}

					jsonData[wsname]=data;
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

	var init = function(){

		$scope.jsonData=dataService.getJsonData();
		$scope.groups=[];
		updateTable();

	}

	var updateTable = function () {

		$scope.jsonData=dataService.getJsonData();
		$scope.groups=[];

		if(Object.keys($scope.jsonData).length == 0)
			return;

		for(x in $scope.jsonData){

			var newgroup = {name: x};
			newgroup.headers=Object.keys($scope.jsonData[x][0]);
			newgroup.rows=$scope.jsonData[x];
			newgroup.isOpen=false;
			$scope.groups.push(newgroup);

		}

		$scope.$apply();

	}

	var selectedRow = function(row){

		timeService.setTime(row['formattedDate']);


	}

	var highlight = function(){
		$scope.activeDate = timeService.getTime()
	}





	$scope.init = init;
	$scope.selectedRow=selectedRow;

	dataService.registerObserverCallback(init);
	timeService.registerObserverCallback(highlight);





}]);

/**
 * Created by sereb on 9/7/2017.
 */

desking.controller('sliderCtrl', ['$scope', '$filter', 'timeService','$interval', function ($scope, $filter, timeService, $interval) {


	$scope.activeDate = undefined;
	$scope.sliderTimeline=[];

	Date.prototype.addTimeMinutes = function(time) {
		var dat = new Date(this.valueOf())
		dat.setMinutes(dat.getMinutes()+time);
		return dat;
	};


	//Angualar material Datepicker

	$scope.myDate = new Date(timeService.getTime());
	$scope.minDate = new Date();

	$scope.maxDate = new Date(
		$scope.myDate.getFullYear(),
		$scope.myDate.getMonth(),
		$scope.myDate.getDate()+30
	);


	$scope.onlyWeekdaysPredicate = function(date) {
		var day = date.getDay();
		return day !== 0 && day !== 6;
	};


	$scope.$watch("myDate",function(newVal,oldVal){

		$scope.sliderTimeline=popualteSliderTimeline(new Date(newVal));
		$scope.slider_translate.options.stepsArray = $scope.sliderTimeline;

	});




	//Slider config with custom display function
	$scope.timeLine=[];
	$scope.slider_translate = {
		value: 0,
		// options: {
		// 	stepsArray: timeService.getTimeline(),
		// 	onChange:  function(sliderId, modelValue, highValue, pointerType){
		// 		timeService.setTime(modelValue);
		//
		// 	},
		// 	translate: function (value) {
		// 		return   $filter('date')(value, 'dd-MM-yyyy');;
		// 	},
		// 	showTicks: 7
		// }
		options: {
			stepsArray: $scope.sliderTimeline,
			onChange:  function(sliderId, modelValue, highValue, pointerType){
				timeService.setTime(modelValue);

			},
			translate: function (value) {
				return   $filter('date')(value, 'dd-MM-yyyy');;
			},
			showTicks: 2
		}
	};

	var updateSlider = function(){
		// $scope.slider_translate.options.stepsArray = timeService.getTimeline();
		$scope.timeLine=timeService.getTimeline();
		$scope.minDate = new Date(timeService.getTimeline()[0]);
		$scope.myDate =$scope.minDate;
		$scope.maxDate = new Date(timeService.getTimeline()[timeService.getTimeline().length-1]);
	}

	var updateSliderValue =function(){

		$scope.myDate= new Date(timeService.getTime());
		$scope.slider_translate.value=timeService.getTime();

	}

	$scope.playAnimation= function(){

		$scope.timeLine = timeService.getTimeline();

		var play=0;

			var anime=$interval(function(){
				timeService.setTime($scope.timeLine[play]);

				if(play<$scope.timeLine.length-1){
					play++;

				}
				else{
					timeService.setTime($scope.timeLine[0]);
					$interval.cancel(anime);
				}

			}, 400);


	};


	var popualteSliderTimeline = function(date){

		var timeArray = new Array();
		var currentDate = new Date(date);
		var stopDate = new Date(date);
		currentDate.setHours(9);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		currentDate.setMilliseconds(0);
		stopDate.setHours(18);
		stopDate.setMinutes(0);
		stopDate.setSeconds(0);
		stopDate.setMilliseconds(0);


		while (currentDate <= stopDate) {
			timeArray.push( new Date(currentDate).getTime());
			currentDate.setMinutes(currentDate.getMinutes()+15);
		}
		return timeArray;

	}













	timeService.registerObserverCallback(updateSliderValue);

	timeService.registerSliderObserverCallback(updateSlider);

}]);



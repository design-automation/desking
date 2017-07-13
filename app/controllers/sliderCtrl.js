/**
 * Created by sereb on 9/7/2017.
 */

desking.controller('sliderCtrl', ['$scope', '$filter', 'timeService','$interval', function ($scope, $filter, timeService, $interval) {


	$scope.activeDate = undefined;


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

	});




	//Slider config with custom display function
	$scope.timeLine=[];
	$scope.slider_translate = {
		value: 0,
		options: {
			stepsArray: timeService.getTimeline(),
			onChange:  function(sliderId, modelValue, highValue, pointerType){
				timeService.setTime(modelValue);

			},
			translate: function (value) {
				return   $filter('date')(value, 'dd-MM-yyyy');;
			},
			showTicks: 7
		}
	};

	var updateSlider = function(){
		$scope.slider_translate.options.stepsArray = timeService.getTimeline();
		$scope.timeLine=timeService.getTimeline();
		$scope.minDate = new Date(timeService.getTimeline()[0]);
		$scope.myDate =$scope.minDate;
		$scope.maxDate = new Date(timeService.getTimeline()[timeService.getTimeline().length-1]);
	}

	var updateSliderValue =function(){
		$scope.slider_translate.value=timeService.getTime();
		$scope.myDate= new Date($scope.slider_translate.value);

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









	timeService.registerObserverCallback(updateSliderValue);

	timeService.registerSliderObserverCallback(updateSlider);

}]);



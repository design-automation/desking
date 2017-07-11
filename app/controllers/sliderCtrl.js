/**
 * Created by sereb on 9/7/2017.
 */

spaceBlocker.controller('sliderCtrl', ['$scope', '$filter', 'timeService','$interval', function ($scope, $filter, timeService,$interval) {

	//Slider config with custom display function
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

	}

	var updateSliderValue =function(){
		$scope.slider_translate.value=timeService.getTime();

	}

	// $scope.activeDate = timeService.getTime();





	$scope.playAnimation= function(){

		$scope.timeLine = timeService.getTimeline();

		var play=0;

			var anime=$interval(function(){
				timeService.setTime($scope.timeLine[play]);

				if(play<$scope.timeLine.length-1){
					play++;

				}
				else{
					$interval.cancel(anime);
				}

			}, 100);


	};


	timeService.registerObserverCallback(updateSliderValue);

	timeService.registerSliderObserverCallback(updateSlider);

}]);



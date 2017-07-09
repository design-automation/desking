/**
 * Created by sereb on 9/7/2017.
 */

spaceBlocker.controller('sliderCtrl', ['$scope', '$filter', 'timeService', function ($scope, $filter, timeService) {

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

	$scope.activeDate = timeService.getTimeline();




	// var playAnimation=function(){
	//
	// 	for(i=$scope.timeline[0];i<=$scope.timeline[1];i=i+86400000){
	//
	// 	}
	//
	// }


	timeService.registerObserverCallback(updateSliderValue);

	timeService.registerSliderObserverCallback(updateSlider);

}]);


